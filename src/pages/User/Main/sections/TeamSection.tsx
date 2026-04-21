import { Text } from "@vapor-ui/core";
import { SectionHeader } from "../../components/SectionHeader";
import { TEAM } from "../../mainData";

function TeamCard({
  name,
  role,
  color,
  tasks,
  idx,
}: {
  name: string;
  role: "FE" | "BE";
  color: string;
  tasks: string[];
  idx: number;
}) {
  return (
    <div className="flex flex-col items-center h-full">
      {/* Lanyard string */}
      <div className="w-0.5 h-5 bg-gradient-to-b from-gray-100 to-gray-300" />
      {/* Clip */}
      <div
        className="w-7 h-2 rounded-full border border-gray-100 mb-[-1px]"
        style={{
          background: "linear-gradient(135deg, #d0d0d0, #a8a8a8)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        }}
      />

      {/* Card */}
      <div className="flex flex-col flex-1 w-full overflow-hidden bg-white border shadow-md rounded-xl border-gray-90">
        {/* Header */}
        <div
          className="relative flex flex-col items-center gap-1 px-3 pt-3 pb-4"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
          }}
        >
          <div
            className="absolute w-3 h-3 -translate-x-1/2 border rounded-full top-2 left-1/2 border-white/50"
            style={{ background: "#e8e8ec" }}
          />
          <Text
            className="text-[8px] font-bold tracking-widest mt-3 block"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            GOORM CRM STUDIO
          </Text>
          <div
            className="flex items-center justify-center mt-1 text-xl font-bold text-white border-2 rounded-full w-14 h-14 border-white/60"
            style={{
              background: "rgba(255,255,255,0.2)",
              boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
            }}
          >
            {name[0]}
          </div>
        </div>

        {/* Name & role */}
        <div className="flex flex-col items-center gap-1 px-3 pt-3">
          <Text className="font-bold text-gray-400 text-body3">{name}</Text>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}35`,
              color,
            }}
          >
            {role} Engineer
          </span>
        </div>

        <div className="mx-3 my-2.5 border-t border-dashed border-gray-90" />

        {/* Tasks */}
        <ul className="flex flex-col flex-1 gap-1 px-3">
          {tasks.map((task) => (
            <li key={task} className="flex items-start gap-1.5">
              <span
                className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                style={{ background: color }}
              />
              <Text className="text-[10px] text-gray-300 leading-snug">
                {task}
              </Text>
            </li>
          ))}
        </ul>

        {/* Barcode */}
        <div className="flex flex-col items-center gap-1 px-3 py-3">
          <div className="flex gap-[1.5px] h-6">
            {[
              2, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1,
              2, 1, 2, 3, 1, 1,
            ].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  background:
                    i % 3 === 0 ? "#111" : i % 3 === 1 ? "#555" : "#999",
                  borderRadius: 0.5,
                }}
                className="h-full"
              />
            ))}
          </div>
          <Text className="text-[8px] text-gray-100 tracking-[0.18em]">
            EMP-2026-00{idx + 1}
          </Text>
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <SectionHeader
          title="팀 소개"
          subtitle="DeepDive 팀이 함께 만들었습니다."
        />

        <div className="grid items-stretch grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map((member, idx) => (
            <TeamCard key={member.name} {...member} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
