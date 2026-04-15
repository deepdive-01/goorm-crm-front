import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { deleteAccount, getProfile, updateProfile } from "../services/user";
import type {
  DeleteAccountRequest,
  UpdateProfileRequest,
  UserProfile,
} from "../types/user.types";

interface UserContextValue {
  // 사용자 프로필 데이터 (null: 미로그인 또는 로딩 전)
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  // 개인정보 수정: 성공 시 캐시도 함께 갱신
  updateProfile: (body: UpdateProfileRequest) => Promise<void>;
  // 회원 탈퇴: 성공 시 캐시 초기화
  deleteAccount: (body: DeleteAccountRequest) => Promise<void>;
  // 캐시를 무효화하고 다시 fetch (로그인 직후 등에 사용)
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이미 fetch가 진행 중이거나 완료됐는지 추적해 중복 호출 방지
  const fetchedRef = useRef(false);
  const fetchingRef = useRef(false);

  const fetchProfile = useCallback(async () => {
    // 이미 진행 중이면 스킵
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProfile();
      setProfile(data);
      fetchedRef.current = true;
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(
        e.response?.data?.message ?? "사용자 정보를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  // 마운트 시 한 번만 조회 (이미 fetch된 경우 스킵)
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchProfile();
    }
  }, [fetchProfile]);

  // 개인정보 수정: API 성공 시 캐시를 새 값으로 업데이트
  const handleUpdateProfile = useCallback(
    async (body: UpdateProfileRequest) => {
      const updated = await updateProfile(body);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: updated.name,
              phone: updated.phone,
              address: updated.address,
            }
          : prev,
      );
    },
    [],
  );

  // 회원 탈퇴: API 성공 시 캐시 초기화
  const handleDeleteAccount = useCallback(
    async (body: DeleteAccountRequest) => {
      await deleteAccount(body);
      setProfile(null);
      fetchedRef.current = false;
    },
    [],
  );

  // 강제 재조회 (캐시 무효화 후 다시 fetch)
  const refetch = useCallback(async () => {
    fetchedRef.current = false;
    await fetchProfile();
  }, [fetchProfile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        isLoading,
        error,
        updateProfile: handleUpdateProfile,
        deleteAccount: handleDeleteAccount,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// UserContext를 읽는 커스텀 훅 (Provider 밖에서 사용하면 에러)
export function useUserContext(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return ctx;
}
