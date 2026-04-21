import { Skeleton, Text, VStack } from "@vapor-ui/core";

type MyPageTitleProps = {
  recipient: string;
  email: string;
  isLoading: boolean;
};

export default function MyPageTitle({
  recipient,
  email,
  isLoading,
}: MyPageTitleProps) {
  return (
    <VStack className="w-10/12 gap-1">
      {isLoading ? (
        <>
          <Skeleton shape="square" className="w-32" />
          <Skeleton shape="square" className="w-48" />
        </>
      ) : (
        <>
          <Text className="text-h2">{recipient}</Text>
          <Text className="text-body4">{email}</Text>
        </>
      )}
    </VStack>
  );
}
