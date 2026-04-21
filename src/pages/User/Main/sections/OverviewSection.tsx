import { Text } from "@vapor-ui/core";
import { GithubIcon } from "@vapor-ui/icons";
import { SectionHeader } from "../../components/SectionHeader";
import { PROJECT_INFO } from "../../mainData";

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white border border-gray-90 rounded-2xl">
      <Text className="block mb-3 font-bold tracking-wider text-gray-300 uppercase text-body4">
        {label}
      </Text>
      <div>{children}</div>
    </div>
  );
}

export function OverviewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader
          title="프로젝트 개요"
          subtitle="React와 Spring Boot을 활용하여 CRM 서비스를 구현하는 프로젝트입니다."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InfoCard label="진행 기간">
            <Text className="font-bold text-gray-400 text-body1">
              {PROJECT_INFO.period}
            </Text>
          </InfoCard>

          <InfoCard label="팀 구성">
            <div className="flex flex-wrap gap-2">
              {PROJECT_INFO.team.map(({ name, role }) => (
                <span
                  key={name}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-body4 font-semibold ${
                    role === "FE"
                      ? "bg-semantic-blueSoft text-primary-500"
                      : "bg-semantic-greenSoft text-semantic-green"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${role === "FE" ? "bg-primary-500" : "bg-semantic-green"}`}
                  />
                  {name}
                  <span className="opacity-60">{role}</span>
                </span>
              ))}
            </div>
          </InfoCard>

          <InfoCard label="기술 스택">
            <Text className="block mb-1 text-gray-400 text-body4">
              <span className="font-bold text-primary-500">FE</span>{" "}
              {PROJECT_INFO.feStack}
            </Text>
            <Text className="block text-gray-400 text-body4">
              <span className="font-bold text-semantic-green">BE</span>{" "}
              {PROJECT_INFO.beStack}
            </Text>
          </InfoCard>

          <InfoCard label="배포 환경 & GitHub">
            <Text className="block mb-3 text-gray-400 text-body4">
              {PROJECT_INFO.deployInfo}
            </Text>
            <div className="flex flex-col gap-2">
              {[
                { label: "FE", href: PROJECT_INFO.githubFe },
                { label: "BE", href: PROJECT_INFO.githubBe },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 transition-colors text-body4 hover:text-primary-500"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{label} Repository</span>
                </a>
              ))}
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
