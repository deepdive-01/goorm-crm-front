import { Text } from "@vapor-ui/core";
import { SectionHeader } from "../../components/SectionHeader";
import { DEV_FLOW } from "../../mainData";

const TAG_STYLE: Record<string, string> = {
  FE: "bg-semantic-blueSoft text-primary-500",
  BE: "bg-semantic-greenSoft text-semantic-green",
  "BE·FE": "bg-semantic-purpleSoft text-semantic-purple",
  공통: "bg-semantic-yellowSoft text-semantic-orange",
};

export function DevFlowSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader
          title="개발 흐름"
          subtitle="기획 및 설계 → 기능 구현 → 연동 및 배포 → 마무리의 단계로 진행되었습니다."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DEV_FLOW.map(({ phase, steps }, phaseIdx) => (
            <div key={phase} className="flex flex-col">
              {/* Phase header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center font-bold text-white rounded-full w-7 h-7 bg-primary-500 text-body5 shrink-0">
                  {phaseIdx + 1}
                </span>
                <Text className="font-bold text-gray-400 text-body3">
                  {phase}
                </Text>
              </div>

              {/* Steps */}
              <ul className="flex flex-col gap-2">
                {steps.map(({ tag, desc }) => (
                  <li
                    key={desc}
                    className="p-3 border bg-gray-50 rounded-xl border-gray-90"
                  >
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-body5 font-bold mb-1.5 ${TAG_STYLE[tag] ?? "bg-gray-50 text-gray-300"}`}
                    >
                      {tag}
                    </span>
                    <Text className="block leading-relaxed text-gray-300 text-body5">
                      {desc}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
