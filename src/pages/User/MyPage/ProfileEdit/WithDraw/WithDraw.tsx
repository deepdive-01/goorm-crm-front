import { Button, Callout, Dialog, VStack } from "@vapor-ui/core";

import { useWithDraw } from "../../../../../hooks/useWithDraw";
import Input from "../../../../../components/common/Input/Input";

interface WithDrawProps {
  /** 트리거 버튼 크기 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 탈퇴 안내 문구 */
  description?: string;
}

/**
 * 회원 탈퇴 컴포넌트
 *
 * 트리거 버튼 클릭 → 모달 오픈 → 비밀번호 입력 → 탈퇴 API 호출
 * 탈퇴 성공 시 로그인 페이지로 이동
 *
 * 사용법: <WithDrawExample /> 참고
 */
export default function WithDraw({ size, description }: WithDrawProps) {
  const {
    password, // 비밀번호 (필수)
    reason, // 탈퇴 사유 (선택)
    isDeleting, // 탈퇴 API 호출 중 여부
    deleteError, // 탈퇴 실패 시 에러 메시지
    setPassword,
    setReason,
    handleDelete, // deleteAccount API 호출 후 /login 이동
  } = useWithDraw();

  return (
    <Dialog.Root>
      {/* 트리거: 회원 탈퇴하기 버튼 클릭 시 모달 오픈 */}
      <Dialog.Trigger
        render={
          <Button
            size={size}
            className="px-4 text-white bg-primary-500 text-body4 w-fit"
          >
            회원 탈퇴하기
          </Button>
        }
      />

      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title className="text-black text-h5">회원 탈퇴</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <VStack $css={{ gap: "$200" }}>
            {/* 탈퇴 안내 문구 (선택적으로 전달) */}
            {description && (
              <Dialog.Description className="text-gray-400 text-body4">
                {description}
              </Dialog.Description>
            )}

            {/* 비밀번호: 탈퇴 확인을 위한 필수 입력 */}
            <Input
              id="password"
              label="비밀번호"
              type="password"
              size={size ?? "lg"}
              placeholder="현재 비밀번호를 입력해주세요"
              inputClassName="placeholder:text-gray-300"
              showRequiredMark
              validationMode="onBlur"
              name="required-field"
              match="patternMismatch"
              pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,16}"
              requiredError="8~16자, 영문, 숫자, 특수문자 포함"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 탈퇴 사유: 선택 입력, 빈 값이면 API에 미전송 */}
            <Input
              id="withdraw-reason"
              label="탈퇴 사유"
              size={size ?? "lg"}
              placeholder="탈퇴 사유를 입력해주세요 (선택)"
              inputClassName="placeholder:text-gray-300"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            {/*
             * 탈퇴 실패 시 에러 메시지 표시
             * deleteError가 생기면 open이 true가 되어 Panel이 자동으로 펼쳐짐
             * deleteError가 없으면(null) 접힌 상태 유지
             */}
            {deleteError && (
              <Callout.Root colorPalette="warning" className="text-body5">
                {deleteError}
              </Callout.Root>
            )}
          </VStack>
        </Dialog.Body>

        <Dialog.Footer className="flex justify-end gap-2">
          {/* 취소: Dialog.Close로 감싸 클릭 시 모달 즉시 닫기 */}
          <Dialog.Close
            render={
              <Button
                size={size}
                className="px-4 text-gray-400 border text-body4 bg-gray-90 border-90"
              >
                닫기
              </Button>
            }
          />

          {/*
           * 회원 탈퇴: 비밀번호 미입력 시 비활성화
           * isDeleting 중에는 버튼 비활성화해 중복 요청 방지
           */}
          <Button
            size={size}
            className="px-4 text-white bg-primary-500 text-body4"
            onClick={handleDelete}
            disabled={!password || isDeleting}
          >
            {isDeleting ? "탈퇴 처리 중..." : "회원 탈퇴하기"}
          </Button>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog.Root>
  );
}
