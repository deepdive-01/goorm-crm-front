import { Text } from "@vapor-ui/core";
import { SectionHeader } from "../../components/SectionHeader";
import { TECH_CATEGORIES } from "../../mainLogos";

export function TechStackSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader
          title="기술 스택"
          subtitle="아래 기술을 사용하여 만들었습니다."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TECH_CATEGORIES.map(({ category, color, bg, items }) => (
            <div
              key={category}
              className="p-6 rounded-2xl"
              style={{ background: bg, border: `1.5px solid ${color}30` }}
            >
              <Text
                className="block mb-5 font-bold text-body3"
                style={{ color }}
              >
                {category}
              </Text>
              <div className="flex flex-wrap gap-4">
                {items.map(({ name, Logo }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-1.5 w-16"
                  >
                    <Logo size={36} />
                    <Text className="font-semibold text-center text-gray-400 text-body5">
                      {name}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
