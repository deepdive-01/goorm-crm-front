import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, CloseOutlineIcon, UserIcon } from "@vapor-ui/icons";
import type { ManagedMember } from "../../../services/memberManagement";
import type { ManagedAdmin } from "../../../services/adminManagement";
import type { SelectDropdownProps } from "../../../types/userDetailPanel.types";
import {
  MEMBER_GRADES,
  ADMIN_ROLES,
} from "../../../types/userDetailPanel.types";

// 선택 드롭다운
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

// member variant: user_id(number) 기반, grade/status 변경 가능
// address/phone 수정은 실제 API 없으므로 미지원
interface MemberPanelProps {
  variant: "member";
  data: ManagedMember;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    user_id: number,
    payload: { grade?: string; status?: string },
  ) => void;
}

// admin variant: user_id(number) 기반, role 변경만 가능 (phone 수정 API 없음)
interface AdminPanelProps {
  variant: "admin";
  data: ManagedAdmin;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    user_id: number,
    payload: { role?: string },
  ) => void;
}

export type UserDetailPanelProps = MemberPanelProps | AdminPanelProps;

export default function UserDetailPanel(props: UserDetailPanelProps) {
  const { variant, data, isOpen, onClose, onSave } = props;

  const isMember = variant === "member";
  const memberData = isMember ? (data as ManagedMember) : null;
  const adminData = !isMember ? (data as ManagedAdmin) : null;

  // member: grade/status 상태 (address/phone 수정 API 없음)
  const [grade, setGrade] = useState(memberData?.grade ?? "");
  const [status, setStatus] = useState(memberData?.status ?? "ACTIVE");

  // admin: role 상태 (권한 변경에 사용)
  const [role, setRole] = useState(adminData?.role ?? "ADMIN");

  // 선택 대상이 바뀌면 폼 초기화
  // member/admin 모두 user_id 기준으로 리셋
  const entityKey = (data as ManagedMember).user_id ?? (data as ManagedAdmin).user_id;

  useEffect(() => {
    setGrade(memberData?.grade ?? "");
    setStatus(memberData?.status ?? "ACTIVE");
    setRole(adminData?.role ?? "ADMIN");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityKey]);

  function handleSave() {
    if (isMember) {
      // member: grade/status 전달 (address/phone 수정 API 없음)
      (onSave as MemberPanelProps["onSave"])((data as ManagedMember).user_id, {
        grade,
        status,
      });
    } else {
      // admin: role만 전달
      (onSave as AdminPanelProps["onSave"])((data as ManagedAdmin).user_id, {
        role,
      });
    }
    onClose();
  }

  function handleDeactivate() {
    if (isMember) {
      // 실제 API 상태값: "ACTIVE" | "BANNED"
      const nextStatus = status === "ACTIVE" ? "BANNED" : "ACTIVE";
      (onSave as MemberPanelProps["onSave"])((data as ManagedMember).user_id, {
        status: nextStatus,
      });
      setStatus(nextStatus);
    }
  }

  const panelTitle = isMember ? "사용자 정보 수정" : "관리자 정보 수정";
  const panelSubtitle = isMember
    ? "회원의 정보를 수정할 수 있습니다"
    : "관리자의 권한을 변경할 수 있습니다";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isOpen && (
          <>
            {/* 헤더 */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-90">
              <div>
                <h2 className="text-body2 font-bold text-gray-400">
                  {panelTitle}
                </h2>
                <p className="text-body5 text-gray-300 mt-0.5">
                  {panelSubtitle}
                </p>
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

            {/* 유저 정보 요약 */}
            <div className="flex items-center gap-3 px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-semantic-blueSoft flex items-center justify-center flex-shrink-0">
                <UserIcon size={20} className="text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body4 font-semibold text-gray-400 truncate">
                  {data.name}
                </p>
                <p className="text-body5 text-gray-300 truncate">
                  {data.email}
                </p>
              </div>
              {/* 비활성화 버튼은 member variant에서만 노출 */}
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

              {/* member 전용: 상태/등급 (address/phone 수정 API 없음) */}
              {isMember && (
                <>
                  <Field label="상태" required>
                    <StatusBadge status={status} />
                  </Field>
                  <Field label="등급" required>
                    <SelectDropdown
                      value={grade}
                      options={MEMBER_GRADES}
                      onChange={setGrade}
                      primary
                    />
                  </Field>
                </>
              )}

              {/* admin 전용: 권한(role) 변경 — PATCH /api/v1/root/accounts/{user_id}/role */}
              {!isMember && (
                <Field label="권한" required>
                  <SelectDropdown
                    value={role}
                    options={ADMIN_ROLES}
                    onChange={setRole}
                    primary
                  />
                </Field>
              )}

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
          </>
        )}
      </div>
    </>
  );
}
