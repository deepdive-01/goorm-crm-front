import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, SearchOutlineIcon } from "@vapor-ui/icons";
import { TextInput } from "@vapor-ui/core";

// 멤버리스트 헤더 검색, 필터, 추가 버튼에 대한 interface
interface MemberListHeaderProps {
  onSearch: (value: string) => void;
  onFilterChange: (
    type: "status" | "grade" | "attribute",
    value: string,
  ) => void;
  onAdd: () => void;
}

// 필터 옵션 정의
const FILTER_OPTIONS = {
  status: [
    { value: "all", label: "전체" },
    { value: "active", label: "활성" },
    { value: "dormant", label: "휴면" },
  ],
  grade: [
    { value: "all", label: "전체" },
    { value: "Gold", label: "Gold" },
    { value: "Silver", label: "Silver" },
    { value: "Bronze", label: "Bronze" },
    { value: "Member", label: "Member" },
  ],
  attribute: [
    { value: "all", label: "전체" },
    { value: "new", label: "신규" },
    { value: "existing", label: "기존" },
  ],
} as const;

// 필터 드롭다운 타입
type FilterType = "status" | "grade" | "attribute";

// 필터 드롭다운 interface
interface FilterDropdownProps {
  label: string;
  type: FilterType;
  options: readonly { value: string; label: string }[];
  onChange: (type: FilterType, value: string) => void;
}

// 필터 드롭다운 컴포넌트
function FilterDropdown({
  label,
  type,
  options,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫힘
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
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 border border-gray-90 rounded-lg px-3 py-2 text-body4 text-gray-400 hover:border-primary-500 transition-colors whitespace-nowrap"
      >
        {selected ?? label}
        <CaretDownIcon size={14} className="text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-gray-90 rounded-lg shadow-sm z-10 min-w-full overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.label}
              className="w-full text-left px-4 py-2 text-body4 text-gray-400 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSelected(opt.label);
                onChange(type, opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 테이블 필터 컴포넌트
export default function TableFilter({
  onSearch,
  onFilterChange,
  onAdd,
}: MemberListHeaderProps) {
  const [searchValue, setSearchValue] = useState(""); // 검색 상태
  const [isFocused, setIsFocused] = useState(false); // 검색창을 눌렀는지에 대한 상태

  // 검색값이 반영되는 시간
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue); // 300ms 후에 검색어 반영
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  // 검색창에 focus가 없고, 검색어가 비어 있을때만 아이콘을 보이도록
  const showIcon = !isFocused && searchValue === "";

  return (
    <div className="flex items-center justify-between">
      {/* 좌측: 타이틀 */}
      <h2 className="text-body2 font-medium">회원 목록</h2>

      {/* 우측: 검색 + 필터 + 추가 버튼 */}
      <div className="flex items-center gap-2">
        {/* 검색창 */}
        <div className="relative flex items-center">
          {showIcon && (
            <SearchOutlineIcon
              size={16}
              className="absolute left-3 text-gray-300 pointer-events-none z-10"
            />
          )}
          <TextInput
            placeholder={isFocused ? "" : "이름으로 검색"}
            value={searchValue}
            onValueChange={(value) => setSearchValue(value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`text-body4 font-medium ${isFocused ? "pr-5 pl-3" : "pl-8"}`}
          />
        </div>

        {/* 필터 드롭다운 3개 */}
        <FilterDropdown
          label="상태"
          type="status"
          options={FILTER_OPTIONS.status}
          onChange={onFilterChange}
        />
        <FilterDropdown
          label="등급"
          type="grade"
          options={FILTER_OPTIONS.grade}
          onChange={onFilterChange}
        />
        <FilterDropdown
          label="속성"
          type="attribute"
          options={FILTER_OPTIONS.attribute}
          onChange={onFilterChange}
        />

        {/* 추가 버튼 */}
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-primary-500 text-white text-body4 px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors whitespace-nowrap"
        >
          + 추가
        </button>
      </div>
    </div>
  );
}
