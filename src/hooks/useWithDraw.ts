import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../context/UserContext";

/**
 * 회원 탈퇴 모달의 상태와 로직을 관리하는 훅
 *
 * - UserContext의 deleteAccount를 호출해 API 요청 및 캐시 초기화
 * - 성공 시 onClose로 모달 닫기 → /login으로 이동
 * - 실패 시 서버 에러 메시지를 deleteError에 저장
 *
 * @param onClose - 성공 후 모달을 닫기 위해 Edit 컴포넌트가 주입하는 콜백
 */
export function useWithDraw(onClose?: () => void) {
  const { deleteAccount } = useUserContext();
  const navigate = useNavigate();

  // 비밀번호 (필수)
  const [password, setPassword] = useState("");
  // 탈퇴 사유 (선택)
  const [reason, setReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  /**
   * 회원 탈퇴 처리
   *
   * - password는 항상 전송, reason은 입력된 경우에만 전송
   * - 성공: 캐시 초기화(UserContext) → 모달 닫기 → 로그인 페이지 이동
   * - 실패: 서버 메시지 또는 기본 에러 문자열을 deleteError에 저장
   */
  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount({
        password,
        // 빈 문자열이면 전송하지 않음
        reason: reason.trim() || undefined,
      });
      onClose?.();
      navigate("/login");
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setDeleteError(
        e.response?.data?.message ??
          "회원 탈퇴에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    password,
    reason,
    isDeleting,
    deleteError,
    setPassword,
    setReason,
    handleDelete,
  };
}
