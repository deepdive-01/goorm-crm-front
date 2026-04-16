import { useEffect, useState } from "react";
import { CloseOutlineIcon } from "@vapor-ui/icons";
import { Checkbox, TextInput } from "@vapor-ui/core";
import type {
  Grade,
  UpdateGradePayload,
} from "../../../services/gradeManagement";

// 상세 정보 패널 인터페이스
interface GradeDetailPanelProps {
  data: Grade;
  isOpen: boolean;
  onClose: () => void;
  onSave: (grade_id: number, payload: UpdateGradePayload) => void;
  onDelete?: (grade_id: number) => void;
}

// 제목
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-body4 font-bold text-gray-400 mt-2">{children}</h3>
  );
}

// 필드
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-body5 font-medium text-gray-400">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function GradeDetailPanel({
  data,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: GradeDetailPanelProps) {
  const [minPurchase, setMinPurchase] = useState(
    String(data.min_purchase_amount),
  );
  const [discountRate, setDiscountRate] = useState(String(data.discount_rate));
  const [rewardRate, setRewardRate] = useState(String(data.reward_rate));
  const [isFreeShipping, setIsFreeShipping] = useState(data.is_free_shipping);

  // 선택 대상이 바뀌면 폼 초기화
  useEffect(() => {
    setMinPurchase(String(data.min_purchase_amount));
    setDiscountRate(String(data.discount_rate));
    setRewardRate(String(data.reward_rate));
    setIsFreeShipping(data.is_free_shipping);
  }, [data.grade_id]);

  function handleSave() {
    onSave(data.grade_id, {
      min_purchase_amount: Number(minPurchase),
      discount_rate: Number(discountRate),
      reward_rate: Number(rewardRate),
      is_free_shipping: isFreeShipping,
    });
    onClose();
  }

  return (
    <>
      {/* 백드롭 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      )}

      {/* 드로어 패널 */}
      <div
        className={`fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isOpen && (
          <>
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-90">
              <h2 className="text-body2 font-bold text-gray-400">
                등급 상세 정보
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-gray-400 transition-colors"
                aria-label="패널 닫기"
              >
                <CloseOutlineIcon size={18} />
              </button>
            </div>

            {/* 폼 */}
            <div className="flex-1 px-6 py-5 flex flex-col gap-4 overflow-y-auto">
              {/* 기본 정보 */}
              <SectionHeading>기본 정보</SectionHeading>

              <Field label="등급명" required>
                <div className="border border-gray-90 rounded-lg px-3 py-2.5 text-body4 text-gray-300 bg-gray-50">
                  {data.name}
                </div>
              </Field>

              <Field label="해당 회원 수">
                <div className="border border-gray-90 rounded-lg px-3 py-2.5 text-body4 text-gray-300 bg-gray-50">
                  {data.member_count.toLocaleString()}명
                </div>
              </Field>

              {/* 승급 조건 */}
              <SectionHeading>승급 조건</SectionHeading>

              <Field label="최소 구매 금액 (원)">
                <TextInput
                  value={minPurchase}
                  onValueChange={setMinPurchase}
                  className="text-body4 p-2"
                />
              </Field>

              {/* 혜택 내용 */}
              <SectionHeading>혜택 내용</SectionHeading>

              <Field label="상시 할인율 (%)">
                <TextInput
                  value={discountRate}
                  onValueChange={setDiscountRate}
                  className="text-body4 p-2"
                />
              </Field>

              <Field label="적립률 (%)">
                <TextInput
                  value={rewardRate}
                  onValueChange={setRewardRate}
                  className="text-body4 p-2"
                />
              </Field>

              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-2 rounded-lg">
                <Checkbox.Root
                  checked={isFreeShipping}
                  onCheckedChange={(checked) =>
                    setIsFreeShipping(checked === true)
                  }
                >
                  <Checkbox.IndicatorPrimitive />
                </Checkbox.Root>
                <span className="text-body4 text-gray-400">무료 배송</span>
              </label>
            </div>

            {/* 하단 버튼 */}
            <div className="px-6 py-5 border-t border-gray-90 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onDelete?.(data.grade_id)}
                className="text-body4 font-medium text-red-400 hover:text-red-500 transition-colors"
              >
                삭제
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-90 text-gray-400 text-body4 font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-primary-500 text-white text-body4 font-medium px-4 py-2.5 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
