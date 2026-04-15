import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, CloseOutlineIcon, UserIcon } from "@vapor-ui/icons";
import { TextInput } from "@vapor-ui/core";
import type { ManagedMember } from "../../../services/memberManagement";
import type { ManagedAdmin } from "../../../services/adminManagement";

// ─── 시도 목록 ────────────────────────────────────────────
const PROVINCES = [
  "서울",
  "경기",
  "부산",
  "인천",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const;

const MEMBER_GRADES = ["Member", "Bronze", "Silver", "Gold"] as const;
const ADMIN_GRADES = ["Root", "일반"] as const;

// ─── 주소 파싱 헬퍼 ──────────────────────────────────────
function parseAddress(address: string) {
  const parts = address.split(" ");
  return {
    province: parts[0] ?? "",
    detail: parts.slice(1).join(" "),
  };
}

// ─── SelectDropdown ───────────────────────────────────────
interface SelectDropdownProps {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  primary?: boolean; // 파란색 스타일
}

function SelectDropdown({
  value,
  options,
  onChange,
  primary,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const triggerClass = primary
    ? "w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-body4 font-medium bg-primary-500 text-white hover:bg-primary-400 transition-colors"
    : "w-full flex items-center justify-between border border-gray-90 rounded-lg px-3 py-2.5 text-body4 text-gray-400 bg-white hover:border-primary-500 transition-colors";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className={triggerClass}
      >
        <span>{value || "선택"}</span>
        <CaretDownIcon
          size={14}
          className={primary ? "text-white" : "text-gray-300"}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-90 rounded-lg shadow-md z-[60] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className="w-full text-left px-4 py-2 text-body4 text-gray-400 hover:bg-gray-50 transition-colors"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 필드 래퍼 ────────────────────────────────────────────
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

// ─── 상태 배지 ────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-body5 font-medium w-fit ${
        isActive
          ? "bg-semantic-green text-green-700"
          : "bg-gray-50 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────
interface MemberPanelProps {
  variant: "member";
  data: ManagedMember;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    payload: Partial<
      Pick<ManagedMember, "grade" | "status" | "address" | "phone">
    >,
  ) => void;
}

interface AdminPanelProps {
  variant: "admin";
  data: ManagedAdmin;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    payload: Partial<Pick<ManagedAdmin, "grade" | "phone">>,
  ) => void;
}

export type UserDetailPanelProps = MemberPanelProps | AdminPanelProps;

// ─── 메인 컴포넌트 ────────────────────────────────────────
export default function UserDetailPanel(props: UserDetailPanelProps) {
  const { variant, data, isOpen, onClose, onSave } = props;

  const isMember = variant === "member";
  const memberData = isMember ? (data as ManagedMember) : null;

  const parsed = memberData
    ? parseAddress(memberData.address)
    : { province: "", detail: "" };

  const [phone, setPhone] = useState(data.phone);
  const [grade, setGrade] = useState(data.grade);
  const [province, setProvince] = useState(parsed.province);
  const [detail, setDetail] = useState(parsed.detail);
  const [status, setStatus] = useState(memberData?.status ?? "ACTIVE");

  // 선택 대상이 바뀌면 폼 초기화
  useEffect(() => {
    const p = memberData
      ? parseAddress(memberData.address)
      : { province: "", detail: "" };
    setPhone(data.phone);
    setGrade(data.grade);
    setProvince(p.province);
    setDetail(p.detail);
    setStatus(memberData?.status ?? "ACTIVE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  function handleSave() {
    if (isMember) {
      (onSave as MemberPanelProps["onSave"])(data.id, {
        grade,
        status,
        address: `${province} ${detail}`.trim(),
        phone,
      });
    } else {
      (onSave as AdminPanelProps["onSave"])(data.id, { grade, phone });
    }
    onClose();
  }

  function handleDeactivate() {
    if (isMember) {
      (onSave as MemberPanelProps["onSave"])(data.id, {
        status: status === "ACTIVE" ? "DORMANT" : "ACTIVE",
      });
      setStatus((s) => (s === "ACTIVE" ? "DORMANT" : "ACTIVE"));
    }
  }

  const panelTitle = isMember ? "사용자 정보 수정" : "관리자 정보 수정";
  const panelSubtitle = isMember
    ? "회원의 정보를 수정할 수 있습니다"
    : "관리자의 정보를 수정할 수 있습니다";
  const gradeOptions = isMember ? MEMBER_GRADES : ADMIN_GRADES;
  const gradeLabel = isMember ? "등급" : "권한";

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
        {/* 헤더 */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-90">
          <div>
            <h2 className="text-body2 font-bold text-gray-400">{panelTitle}</h2>
            <p className="text-body5 text-gray-300 mt-0.5">{panelSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-gray-400 transition-colors mt-0.5"
            aria-label="패널 닫기"
          >
            <CloseOutlineIcon size={18} />
          </button>
        </div>

        {/* 유저 정보 */}
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="w-10 h-10 rounded-full bg-semantic-blueSoft flex items-center justify-center flex-shrink-0">
            <UserIcon size={20} className="text-primary-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body4 font-semibold text-gray-400 truncate">
              {data.name}
            </p>
            <p className="text-body5 text-gray-300 truncate">{data.email}</p>
          </div>
          {isMember && (
            <button
              type="button"
              onClick={handleDeactivate}
              className="flex-shrink-0 border border-red-400 text-red-400 text-body5 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              {status === "ACTIVE" ? "비활성화" : "활성화"}
            </button>
          )}
        </div>

        <hr className="mx-6 border-gray-90" />

        {/* 폼 */}
        <div className="flex-1 px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          <Field label="이름" required>
            <div className="border border-gray-90 rounded-lg px-3 py-2.5 text-body4 text-gray-300 bg-gray-50">
              {data.name}
            </div>
          </Field>

          {isMember && (
            <>
              <Field label="도시" required>
                <SelectDropdown
                  value={province}
                  options={PROVINCES}
                  onChange={setProvince}
                />
              </Field>

              <Field label="상세주소" required>
                <TextInput
                  value={detail}
                  onValueChange={setDetail}
                  className="text-body4 p-2"
                />
              </Field>
            </>
          )}

          <Field label="연락처" required>
            <TextInput
              value={phone}
              onValueChange={setPhone}
              className="text-body4 p-2"
            />
          </Field>

          {isMember && (
            <Field label="상태" required>
              <StatusBadge status={status} />
            </Field>
          )}

          <Field label={gradeLabel} required>
            <SelectDropdown
              value={grade}
              options={gradeOptions}
              onChange={setGrade}
              primary
            />
          </Field>

          <Field label="가입일">
            <div className="border border-gray-90 rounded-lg px-3 py-2.5 text-body4 text-gray-300 bg-gray-50">
              {data.created_at}
            </div>
          </Field>
        </div>

        {/* 저장 버튼 */}
        <div className="px-6 py-5 border-t border-gray-90">
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-primary-500 text-white text-body4 font-medium py-3 rounded-lg hover:bg-primary-400 transition-colors"
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}
