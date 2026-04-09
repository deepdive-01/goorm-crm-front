import { VStack, Text } from "@vapor-ui/core";

type TitleProps = {
  title?: string;
  describe?: string;
  DesClassName?: string;
};

export default function Title({ title, describe, DesClassName }: TitleProps) {
  return (
    <VStack>
      <Text className="text-h1 text-black">{title}</Text>
      <Text className={`text-body1 ${DesClassName}`}>{describe}</Text>
    </VStack>
  );
}
