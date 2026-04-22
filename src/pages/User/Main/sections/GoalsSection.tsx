import { Text } from "@vapor-ui/core";
import { CheckCircleOutlineIcon } from "@vapor-ui/icons";
import { SectionHeader } from "../../components/SectionHeader";
import { TECH_GOALS, COLLAB_GOALS } from "../../mainData";

function GoalList({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "blue" | "green";
}) {
  const accent =
    color === "blue"
      ? {
          text: "text-primary-500",
          bg: "bg-semantic-blueSoft",
          border: "border-primary-500/20",
        }
      : {
          text: "text-semantic-green",
          bg: "bg-semantic-greenSoft",
          border: "border-semantic-green/20",
        };

  return (
    <div className={`rounded-2xl border ${accent.border} p-6`}>
      <Text className={`text-body1 font-bold ${accent.text} block mb-5`}>
        {title}
      </Text>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircleOutlineIcon
              className={`w-5 h-5 mt-0.5 shrink-0 ${accent.text}`}
            />
            <Text className="leading-relaxed text-gray-400 text-body4">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GoalsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader title="프로젝트 목표" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GoalList title="기술적 목표" items={TECH_GOALS} color="blue" />
          <GoalList
            title="협업 / 프로세스 목표"
            items={COLLAB_GOALS}
            color="green"
          />
        </div>
      </div>
    </section>
  );
}
