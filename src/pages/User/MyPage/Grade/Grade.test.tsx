import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { server } from "../../../../mocks/server";
import { UserProvider } from "../../../../context/UserContext";
import Grade from "./Grade";

const ORIGINAL_PROFILE = {
  email: "goorm01@goorm.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: "06234\n서울시 강남구 테헤란로 123\n101동 202호",
  grade: "BRONZE",
  role: "USER",
  status: "ACTIVE",
  created_at: "2026-04-03T10:00:00Z",
};

/**
 * Grade는 내부적으로 GradeBar(UserContext), GradeTable(정적)을 함께 렌더링
 * UserProvider: useUserContext로 profile.grade를 읽어 GradeBar에 전달하기 위해 필요
 * MemoryRouter: 혹시 하위 컴포넌트에서 Link/useNavigate 사용 시를 대비
 */
const renderGrade = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <Grade />
      </UserProvider>
    </MemoryRouter>,
  );

// MOCK_PROFILE 변이 누적 방지: 매 테스트 전 GET 핸들러를 초기값으로 재설정
beforeEach(() => {
  server.use(
    http.get("*/api/v1/users/me", () =>
      HttpResponse.json({
        status: 200,
        code: "PROFILE_FETCH_SUCCESS",
        data: ORIGINAL_PROFILE,
      }),
    ),
  );
});

describe("Grade", () => {
  describe("렌더링", () => {
    it("프로필 로드 후 사용자 이름이 등급 제목에 표시된다", async () => {
      renderGrade();
      await waitFor(() => {
        expect(screen.getByText("홍길동님의 등급")).toBeInTheDocument();
      });
    });

    it("현재 연도가 등급 선정 기준 제목에 표시된다", async () => {
      renderGrade();
      const currentYear = new Date().getFullYear();
      await waitFor(() => {
        expect(
          screen.getByText(`${currentYear}년 등급 선정 기준`),
        ).toBeInTheDocument();
      });
    });
  });

  describe("GradeBar", () => {
    it("프로필의 grade(BRONZE)로 GradeBar가 렌더링된다", async () => {
      renderGrade();
      // GradeBar는 4개의 등급 라벨을 표시하므로 모두 존재해야 함
      await waitFor(() => {
        expect(screen.getAllByText("BRONZE").length).toBeGreaterThan(0);
      });
    });

    it("GradeBar에 4개의 등급 라벨이 표시된다", async () => {
      renderGrade();
      await waitFor(() => {
        ["MEMBER", "BRONZE", "SILVER", "GOLD"].forEach((grade) => {
          // GradeBar와 GradeTable 양쪽에 표시되므로 getAllByText 사용
          expect(screen.getAllByText(grade).length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe("GradeTable", () => {
    it("등급 선정 기준 테이블 헤딩이 표시된다", async () => {
      renderGrade();
      await waitFor(() => {
        expect(screen.getByText("등급")).toBeInTheDocument();
        expect(screen.getByText("선정기준")).toBeInTheDocument();
        expect(screen.getByText("할인/적립")).toBeInTheDocument();
        expect(screen.getByText("무료배송")).toBeInTheDocument();
      });
    });

    it("MEMBER의 무료배송은 '-'로 표시된다", async () => {
      renderGrade();
      await waitFor(() => {
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });

    it("BRONZE·SILVER·GOLD의 무료배송은 'O'로 표시된다", async () => {
      renderGrade();
      await waitFor(() => {
        expect(screen.getAllByText("O")).toHaveLength(3);
      });
    });
  });
});
