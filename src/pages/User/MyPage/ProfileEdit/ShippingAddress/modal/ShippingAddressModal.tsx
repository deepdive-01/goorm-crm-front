import { Button, Dialog, HStack, VStack } from "@vapor-ui/core";

import { useShippingAddress } from "../../../../../../hooks/useShippingAddress";
import Input from "../../../../../../components/common/Input/Input";

interface ShippingAddressModalProps {
  /**
   * Edit 컴포넌트가 cloneElement로 주입하는 닫기 콜백
   * 저장 성공 시 useShippingAddress 내부에서 호출해 모달을 닫음
   */
  onClose?: () => void;
}

/**
 * 배송지 입력 모달 컴포넌트
 *
 * Dialog.Root는 Edit 컴포넌트가 제어하므로 여기서는 내용(Header/Body/Footer)만 반환
 * 로직은 useShippingAddress 훅에서 관리
 *
 * 사용법: <Edit modal={<ShippingAddressModal />} />
 */
export default function ShippingAddressModal({
  onClose,
}: ShippingAddressModalProps) {
  const {
    recipient, // 수령인 이름
    phone, // 수령인 전화번호
    zonecode, // 우편번호 (Daum 검색 결과)
    address, // 도로명 주소 (Daum 검색 결과, 직접 수정 불가)
    detailAddress, // 상세 주소 (사용자 직접 입력)
    isSaving, // 저장 API 호출 중 여부
    saveError, // 저장 실패 시 에러 메시지
    setRecipient,
    setPhone,
    setDetailAddress,
    handleAddressSearch, // Daum 우편번호 팝업 열기
    handleSave, // updateProfile API 호출 후 onClose 실행
  } = useShippingAddress(onClose);

  return (
    <>
      <Dialog.Header>
        <Dialog.Title className="text-black text-h5">배송지 입력</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <VStack $css={{ gap: "$200" }}>
          <HStack
            $css={{ gap: "$200", alignItems: "flex-end" }}
            className="w-full"
          >
            {/* 수령인 이름 */}
            <div className="flex-1">
              <Input
                label="수령인"
                size="lg"
                placeholder="이름"
                inputClassName="placeholder:text-gray-300"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            {/* 수령인 전화번호: type="tel"로 자동 포맷(010-0000-0000) 적용 */}
            <div className="flex-1">
              <Input
                placeholder="010-0000-0000"
                type="tel"
                inputClassName="placeholder:text-gray-300"
                size="lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </HStack>

          {/* 배송지 섹션 */}
          <VStack className="w-full">
            {/* 우편번호 + 주소 검색 버튼: 버튼과 인풋을 하단 기준으로 정렬 */}
            <HStack
              $css={{ gap: "$200", alignItems: "flex-end" }}
              className="w-full"
            >
              <div className="flex-1">
                {/*
                 * 우편번호 인풋: Daum 검색 결과로만 채워지므로 disabled
                 * suffix에 주소 검색 버튼을 배치해 함께 렌더링
                 */}
                <Input
                  size="lg"
                  inputClassName="bg-gray-90"
                  label="배송지"
                  disabled
                  value={zonecode}
                  placeholder="우편번호"
                  suffixClassName="gap-4"
                  suffix={
                    <Button
                      size="lg"
                      onClick={handleAddressSearch}
                      className="px-3 text-gray-400 border border-gray-90 text-body"
                    >
                      주소 검색
                    </Button>
                  }
                />
              </div>
            </HStack>

            {/* 도로명 주소: Daum 검색 결과로만 채워지므로 disabled */}
            <Input
              disabled
              inputClassName="bg-gray-90"
              size="lg"
              value={address}
              placeholder="도로명 주소"
            />

            {/* 상세 주소: 동·호수 등 사용자가 직접 입력 */}
            <Input
              placeholder="상세 주소를 입력해주세요"
              inputClassName="placeholder:text-gray-300"
              size="lg"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </VStack>

          {/* 저장 실패 시 에러 메시지 표시 */}
          {saveError && (
            <p className="text-body5 text-semantic-red">{saveError}</p>
          )}
        </VStack>
      </Dialog.Body>

      <Dialog.Footer className="flex justify-end gap-2">
        {/* 취소: Dialog.Close로 감싸 클릭 시 모달 즉시 닫기 */}
        <Dialog.Close
          render={
            <Button
              size="lg"
              className="px-4 text-gray-400 border text-body4 bg-gray-90 border-90"
            >
              취소
            </Button>
          }
        />

        {/*
         * 저장: API 호출 후 성공 시 onClose로 모달 닫기
         * isSaving 중에는 버튼 비활성화해 중복 요청 방지
         */}
        <Button
          size="lg"
          className="px-4 text-white bg-primary-500 text-body4"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "저장 중..." : "저장"}
        </Button>
      </Dialog.Footer>
    </>
  );
}
