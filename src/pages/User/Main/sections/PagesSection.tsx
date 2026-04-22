import { useState } from "react";
import { Text, Badge } from "@vapor-ui/core";
import { SectionHeader } from "../../components/SectionHeader";
import { PAGES, type PageItem } from "../../mainData";

function PageCard({ page }: { page: PageItem }) {
  const isUser = page.type === "user";
  return (
    <div className="bg-white border border-gray-90 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Text className="font-bold text-gray-400 text-body3">
            {page.title}
          </Text>
          <Text className="text-body5 text-gray-300 block mt-0.5">
            {page.role}
          </Text>
        </div>
        <Badge
          colorPalette={isUser ? "hint" : "warning"}
          shape="pill"
          size="sm"
        >
          {page.code}
        </Badge>
      </div>
      <Text className="block mb-3 font-mono text-gray-300 text-body5">
        {page.path}
      </Text>
      <ul className="flex flex-col gap-1.5">
        {page.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              className={`w-1 h-1 rounded-full mt-2 shrink-0 ${isUser ? "bg-primary-500" : "bg-semantic-orange"}`}
            />
            <Text className="text-gray-300 text-body5">{f}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PagesSection() {
  const [tab, setTab] = useState<"user" | "admin">("user");
  const filtered = PAGES.filter((p) => p.type === tab);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader
          title="서비스 페이지 구성"
          subtitle="화면 설계서를 기반으로 구현된 페이지 목록입니다."
        />

        {/* Tab */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 p-1 bg-gray-50 rounded-xl">
            {(["user", "admin"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-body4 font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-gray-400 shadow-sm"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              >
                {t === "user" ? "사용자 페이지" : "관리자 페이지"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((page) => (
            <PageCard key={page.code} page={page} />
          ))}
        </div>
      </div>
    </section>
  );
}
