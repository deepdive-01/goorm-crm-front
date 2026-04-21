import { Text } from "@vapor-ui/core";

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      <Text className="text-h2 font-bold text-gray-400">{title}</Text>
      {subtitle && (
        <Text className="text-body2 text-gray-300 mt-2 block">{subtitle}</Text>
      )}
    </div>
  );
}
