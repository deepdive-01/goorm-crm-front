import { Text } from "@vapor-ui/core";
import { SectionHeader } from "../../components/SectionHeader";
import { LEARNINGS } from "../../mainData";

export function LearningsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader title="학습 내용" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LEARNINGS.map(({ title, desc }, idx) => (
            <div
              key={title}
              className="bg-gray-50 border border-gray-90 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center font-bold rounded-full w-7 h-7 bg-primary-500/10 text-primary-500 text-body5 shrink-0">
                  {idx + 1}
                </span>
                <Text className="font-bold leading-snug text-gray-400 text-body3">
                  {title}
                </Text>
              </div>
              <Text className="block leading-relaxed text-gray-300 text-body4">
                {desc}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
