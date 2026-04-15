import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@vapor-ui/icons";
import { TextInput } from "@vapor-ui/core";
import type { ManagedMember } from "../../../services/memberManagement";
import type { ManagedAdmin } from "../../../services/adminManagement";

// 드롭다운 컴포넌트
interface SelectDropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

function SelectDropdown({
  label: _label,
  value,
  options,
  onChange,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-gray-90 rounded-lg px-3 py-2 text-body4 text-gray-400 hover:border-primary-500 transition-colors bg-white"
      >
        <span>{value}</span>
        <CaretDownIcon size={14} className="text-gray-300" />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-90 rounded-lg shadow-sm z-20 overflow-hidden">
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

// 필드 래퍼
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-body5 font-medium text-gray-300">{label}</label>
      {children}
    </div>
  );
}

const MEMBER_GRADES = ["VIP", "GOLD", "SILVER", "일반"] as const;
const MEMBER_STATUSES = ["ACTIVE", "DORMANT"] as const;
const ADMIN_GRADES = ["Root", "Super", "일반"] as const;

interface MemberPanelProps {
  variant: "member";
  data: ManagedMember;
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
  onSave: (
    id: string,
    payload: Partial<Pick<ManagedAdmin, "grade" | "phone">>,
  ) => void;
}

type UserDetailPanelProps = MemberPanelProps | AdminPanelProps;

export default function UserDetailPanel(props: UserDetailPanelProps) {
  const { variant, data, onSave } = props;

  const [phone, setPhone] = useState(data.phone);
  const [grade, setGrade] = useState(data.grade);
  const [status, setStatus] = useState(
    variant === "member" ? (data as ManagedMember).status : "",
  );
  const [address, setAddress] = useState(
    variant === "member" ? (data as ManagedMember).address : "",
  );

  // 선택된 데이터가 바뀌면 폼 초기화
  useEffect(() => {
    setPhone(data.phone);
    setGrade(data.grade);
    if (variant === "member") {
      setStatus((data as ManagedMember).status);
      setAddress((data as ManagedMember).address);
    }
  }, [data, variant]);

  function handleSave() {
    if (variant === "member") {
      (onSave as MemberPanelProps["onSave"])(data.id, {
        grade,
        status,
        address,
        phone,
      });
    } else {
      (onSave as AdminPanelProps["onSave"])(data.id, { grade, phone });
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="px-6 py-5 border-b border-gray-90">
        <h2 className="text-body2 font-semibold text-gray-400">{data.name}</h2>
        <p className="text-body5 text-gray-300 mt-0.5">{data.email}</p>
      </div>

      {/* 필드 목록 */}
      <div className="flex-1 px-6 py-5 flex flex-col gap-4 overflow-y-auto">
        <Field label="이름">
          <div className="border border-gray-90 rounded-lg px-3 py-2 text-body4 text-gray-300 bg-gray-50">
            {data.name}
          </div>
        </Field>

        <Field label="이메일">
          <div className="border border-gray-90 rounded-lg px-3 py-2 text-body4 text-gray-300 bg-gray-50">
            {data.email}
          </div>
        </Field>

        <Field label="연락처">
          <TextInput
            value={phone}
            onValueChange={setPhone}
            className="text-body4"
          />
        </Field>

        {variant === "member" && (
          <>
            <Field label="주소">
              <TextInput
                value={address}
                onValueChange={setAddress}
                className="text-body4"
              />
            </Field>

            <Field label="등급">
              <SelectDropdown
                label="등급"
                value={grade}
                options={MEMBER_GRADES}
                onChange={setGrade}
              />
            </Field>

            <Field label="상태">
              <SelectDropdown
                label="상태"
                value={status}
                options={MEMBER_STATUSES}
                onChange={setStatus}
              />
            </Field>
          </>
        )}

        {variant === "admin" && (
          <Field label="권한">
            <SelectDropdown
              label="권한"
              value={grade}
              options={ADMIN_GRADES}
              onChange={setGrade}
            />
          </Field>
        )}

        <Field label="가입일">
          <div className="border border-gray-90 rounded-lg px-3 py-2 text-body4 text-gray-300 bg-gray-50">
            {data.created_at}
          </div>
        </Field>
      </div>

      {/* 저장 버튼 */}
      <div className="px-6 py-5 border-t border-gray-90">
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-primary-500 text-white text-body4 font-medium py-2.5 rounded-lg hover:bg-primary-400 transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  );
}
