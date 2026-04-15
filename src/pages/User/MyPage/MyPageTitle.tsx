import { Text, VStack } from "@vapor-ui/core";

type MyPageTitleProps = { recipient: string; email: string };

export default function MyPageTitle({ recipient, email }: MyPageTitleProps) {
  return (
    <VStack className="w-10/12">
      <Text className="text-h2">{recipient}</Text>
      <Text className="text-body4">{email}</Text>
    </VStack>
  );
}
