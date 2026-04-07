import { render, screen } from "@testing-library/react";

function Button() {
  return <button>클릭</button>;
}

test("버튼 렌더링", () => {
  render(<Button />);
  expect(screen.getByText("클릭")).toBeInTheDocument();
});
