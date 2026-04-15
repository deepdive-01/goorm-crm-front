import { useState } from "react";

import { useUserContext } from "../context/UserContext";

/**
 * 배송지 입력 모달의 상태와 로직을 관리하는 훅
 *
 * - UserContext에서 현재 사용자 프로필을 읽어 초기값으로 세팅
 * - Daum 우편번호 API로 주소 검색
 * - 저장 시 updateProfile을 호출해 컨텍스트 캐시도 함께 갱신
 *
 * @param onClose - 저장 성공 후 모달을 닫기 위해 Edit 컴포넌트가 주입하는 콜백
 */
export function useShippingAddress(onClose?: () => void) {
  const { profile, updateProfile } = useUserContext();

  /**
   * profile.address는 "\n" 구분자로 세 부분을 합쳐 저장한 문자열
   * 형태: "우편번호\n도로명주소\n상세주소"
   *
   * split("\n")으로 분리해 각 필드 초기값으로 사용
   * - 저장된 데이터가 없으면 빈 문자열("")로 초기화
   */
  const [savedZonecode, savedAddress, savedDetail] = (
    profile?.address ?? ""
  ).split("\n");

  // 수령인 이름 (profile.name으로 초기화)
  const [recipient, setRecipient] = useState(profile?.name ?? "");
  // 수령인 전화번호 (profile.phone으로 초기화)
  const [phone, setPhone] = useState(profile?.phone ?? "");
  // 우편번호 (Daum 검색 결과로 채워짐)
  const [zonecode, setZonecode] = useState(savedZonecode ?? "");
  // 도로명 주소 (Daum 검색 결과로 채워짐, 직접 수정 불가)
  const [address, setAddress] = useState(savedAddress ?? "");
  // 상세 주소 (동/호수 등 사용자가 직접 입력)
  const [detailAddress, setDetailAddress] = useState(savedDetail ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  /**
   * Daum 우편번호 팝업을 열고, 선택 완료 시 우편번호와 도로명 주소를 업데이트
   *
   * - data.roadAddress: 도로명 주소 (우선)
   * - data.jibunAddress: 지번 주소 (도로명이 없을 경우 대체)
   * - 도로명·우편번호만 여기서 채우고, 상세 주소는 사용자가 직접 입력
   */
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setAddress(data.roadAddress || data.jibunAddress);
      },
    }).open();
  };

  /**
   * 배송지 저장 처리
   *
   * 세 필드를 "\n"으로 합쳐 API에 전송 → 다음에 모달을 열 때 split으로 복원
   * 빈 값은 filter(Boolean)으로 제거해 불필요한 "\n"이 앞뒤에 붙지 않도록 처리
   *
   * 성공: onClose()로 모달 닫기 + UserContext 캐시 자동 갱신
   * 실패: 서버 메시지 또는 기본 에러 문자열을 saveError에 저장
   */
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // "우편번호\n도로명주소\n상세주소" 형태로 합치기
      const fullAddress = [zonecode, address, detailAddress]
        .filter(Boolean)
        .join("\n");
      await updateProfile({ name: recipient, phone, address: fullAddress });
      onClose?.();
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setSaveError(
        e.response?.data?.message ?? "저장에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    recipient,
    phone,
    zonecode,
    address,
    detailAddress,
    isSaving,
    saveError,
    setRecipient,
    setPhone,
    setDetailAddress,
    handleAddressSearch,
    handleSave,
  };
}
