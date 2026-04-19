import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserIcon } from "@vapor-ui/icons";
import { VStack } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import Edit from "../../../components/user/Edit/Edit";
import { fetchAdminMe, updateAdminMe } from "../../../services/dashboard";

// 편집 불가 정보
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-90 last:border-0">
      <span className="text-body4 text-gray-300 w-24 flex-shrink-0">
        {label}
      </span>
      <span className="text-body4 font-medium text-gray-400 flex-1 text-right">
        {value}
      </span>
    </div>
  );
}

export default function AdminMyPage() {
  const queryClient = useQueryClient();

  // 관리자 본인 정보 (GET /api/v1/admin/me)
  const { data: profile } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 이름/전화번호 수정 (PATCH /api/v1/admin/me)
  const { mutateAsync: saveProfile } = useMutation({
    mutationFn: (payload: { name?: string; phone?: string }) =>
      updateAdminMe(payload),
    onSuccess: () => {
      // 저장 성공 시 캐시 무효화해 최신 정보 자동 재조회
      queryClient.invalidateQueries({ queryKey: ["adminMe"] });
    },
  });

  function handleConfirm(field: "name" | "phone") {
    return async (value: string) => {
      await saveProfile({ [field]: value });
    };
  }

  const joinedAt = profile?.created_at?.slice(0, 10) ?? "-";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar
        userName={profile?.name ?? "관리자"}
        roleName={profile?.role ?? "관리자"}
        roleLabel={profile?.name ?? "관리자"}
      />

      <main className="flex-1 flex flex-col items-center py-12 px-8">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* 페이지 타이틀 */}
          <div>
            <h1 className="text-h2 font-bold text-gray-400">내 계정</h1>
            <p className="text-body4 text-gray-300 mt-1">
              관리자 본인의 정보를 조회하고 수정할 수 있습니다
            </p>
          </div>

          {/* 프로필 헤더 카드 */}
          <div className="bg-white rounded-2xl px-8 py-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-semantic-blueSoft flex items-center justify-center flex-shrink-0">
              <UserIcon size={28} className="text-primary-500" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-body2 font-bold text-gray-400">
                {profile?.name ?? "-"}
              </p>
              <p className="text-body4 text-gray-300">
                {profile?.email ?? "-"}
              </p>
              <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-body5 font-medium bg-semantic-blueSoft text-primary-500 w-fit">
                {profile?.role ?? "-"}
              </span>
            </div>
          </div>

          {/* 개인정보 수정 섹션 */}
          <div className="bg-white rounded-2xl px-8 py-2">
            <p className="text-body5 font-semibold text-gray-300 pt-6 pb-4 tracking-wide uppercase">
              개인정보
            </p>

            {/* 이름 */}
            <div className="flex items-center justify-between py-5 border-b border-gray-90">
              <span className="text-body4 text-gray-300 w-24 flex-shrink-0">
                이름
              </span>
              <div className="flex-1 flex justify-end">
                <VStack className="items-end">
                  <Edit
                    size="lg"
                    inputClassName="w-64 text-right"
                    displayValue={profile?.name ?? ""}
                    defaultValue={profile?.name ?? ""}
                    onConfirm={handleConfirm("name")}
                  />
                </VStack>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex items-center justify-between py-5 border-b border-gray-90">
              <span className="text-body4 text-gray-300 w-24 flex-shrink-0">
                이메일
              </span>
              <div className="flex-1 flex justify-end">
                <VStack className="items-end">
                  <Edit
                    size="lg"
                    inputClassName="w-64 text-right"
                    displayValue={profile?.email ?? ""}
                    defaultValue={profile?.email ?? ""}
                    noneEdit
                  />
                </VStack>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center justify-between py-5">
              <span className="text-body4 text-gray-300 w-24 flex-shrink-0">
                전화번호
              </span>
              <div className="flex-1 flex justify-end">
                <VStack className="items-end">
                  <Edit
                    size="lg"
                    type="tel"
                    inputClassName="w-64 text-right"
                    displayValue={profile?.phone ?? ""}
                    defaultValue={profile?.phone ?? ""}
                    onConfirm={handleConfirm("phone")}
                  />
                </VStack>
              </div>
            </div>
          </div>

          {/* 계정 정보 섹션 */}
          <div className="bg-white rounded-2xl px-8 py-2">
            <p className="text-body5 font-semibold text-gray-300 pt-6 pb-4 tracking-wide uppercase">
              계정 정보
            </p>
            <InfoRow label="역할" value={profile?.role ?? "-"} />
            <InfoRow label="등급" value={profile?.grade ?? "-"} />
            <InfoRow label="가입일" value={joinedAt} />
          </div>
        </div>
      </main>
    </div>
  );
}
