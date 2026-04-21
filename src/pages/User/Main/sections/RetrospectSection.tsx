import { Text } from "@vapor-ui/core";
import { RETRO_BAD, RETRO_GOOD, type RetroItem } from "../../mainData";
import { SectionHeader } from "../../components/SectionHeader";

function RetroCard({ item, type }: { item: RetroItem; type: "bad" | "good" }) {
  const style =
    type === "bad"
      ? {
          border: "border-semantic-red/20",
          dot: "bg-semantic-red",
          label: "text-semantic-red",
        }
      : {
          border: "border-semantic-green/20",
          dot: "bg-semantic-green",
          label: "text-semantic-green",
        };

  return (
    <div className={`bg-white border ${style.border} rounded-2xl p-5`}>
      <div className="flex items-start gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${style.dot}`} />
        <Text className={`text-body3 font-bold ${style.label}`}>
          {item.title}
        </Text>
      </div>
      <Text className="block pl-4 leading-relaxed text-gray-300 text-body4">
        {item.desc}
      </Text>
    </div>
  );
}

export function RetrospectSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader title="회고" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Text className="block mb-4 font-bold text-gray-400 text-body1">
              아쉬운 점
            </Text>
            <div className="flex flex-col gap-4">
              {RETRO_BAD.map((item) => (
                <RetroCard key={item.title} item={item} type="bad" />
              ))}
            </div>
          </div>

          <div>
            <Text className="block mb-4 font-bold text-gray-400 text-body1">
              잘된 점
            </Text>
            <div className="flex flex-col gap-4">
              {RETRO_GOOD.map((item) => (
                <RetroCard key={item.title} item={item} type="good" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
