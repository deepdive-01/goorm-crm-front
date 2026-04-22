import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DashBoard from "./DashBoard";

const defaultProps = {
  dashBoardImage: "/test-image.svg",
  mainTitle: "전체 고객",
  mainValue: 1234,
  mainValueVariant: "명" as const,
  firstTitle: "신규 고객",
  firstValue: 56,
  secondTitle: "활성 고객",
  secondValue: 789,
  thirdTitle: "휴면 고객",
  thirdValue: 389,
  routeButton: "고객 관리 바로가기",
  route: "/admin/members",
};

describe("대시보드 테스트", () => {
  it("mainTitle이 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    const mainTitleElement = screen.getByText(defaultProps.mainTitle);
    expect(mainTitleElement).toBeInTheDocument();
  });

  it("mainValue와 mainValueVariant가 함께 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText("1234")).toBeInTheDocument();
    expect(screen.getByText("명")).toBeInTheDocument();
  });
  it("세가지 세부 항목의 제목이 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText(defaultProps.firstTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.secondTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.thirdTitle)).toBeInTheDocument();
  });
  it("세가지 세부 항목의 값이 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(defaultProps.firstValue.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.secondValue.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.thirdValue.toString()),
    ).toBeInTheDocument();
  });
  it("routeButton이 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    const routeButtonElement = screen.getByText(defaultProps.routeButton);
    expect(routeButtonElement).toBeInTheDocument();
  });
  it("dashBoardImage가 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} />
      </MemoryRouter>,
    );
    const imageElement = screen.getByRole("img", { name: "Dashboard" });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", defaultProps.dashBoardImage);
  });
  it("mainValueVariant로 '건'을 전달하면 렌더링 되어야 한다.", () => {
    render(
      <MemoryRouter>
        <DashBoard {...defaultProps} mainValueVariant="건" />
      </MemoryRouter>,
    );
    const mainValueElement = screen.getByText("건");
    expect(mainValueElement).toBeInTheDocument();
  });
});
