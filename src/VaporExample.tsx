import { Card } from "@vapor-ui/core";

export default function VaporExample() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card.Root className="bg-background border-gray-90 w-fit rounded-xl border p-4">
        <Card.Header>
          <h2 className="text-h2 text-gray-300">회원 관리</h2>
        </Card.Header>
        <Card.Body>
          <p className="text-body2 text-blue-300">
            Goorm 회원 관리 서비스입니다.
          </p>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
