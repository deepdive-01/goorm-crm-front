import { Card } from "@vapor-ui/core";

export default function VaporExample() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card.Root className="p-4 border bg-background border-gray-90 w-fit rounded-xl">
        <Card.Header>
          <h2 className="text-gray-300 text-h2">회원 관리</h2>
        </Card.Header>
        <Card.Body>
          <p className="text-body2 text-primary-300">
            Goorm 회원 관리 서비스입니다.
          </p>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
