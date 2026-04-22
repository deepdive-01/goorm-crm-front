import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import MyPage from "./MyPage";

const makeProfile = (role: "USER" | "ADMIN" | "ROOT") => ({
  email: "goorm01@goorm.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: null,
  grade: "BRONZE",
  role,
  status: "ACTIVE",
  created_at: "2026-04-03T10:00:00Z",
});

const renderMyPage = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <MyPage />
      </UserProvider>
    </MemoryRouter>,
  );

const waitForProfile = () =>
  waitFor(() =>
    expect(screen.getAllByText("홍길동").length).toBeGreaterThan(0),
  );

beforeEach(() => {
  server.use(
    http.get("*/api/v1/users/me", () =>
      HttpResponse.json({
        status: 200,
        code: "PROFILE_FETCH_SUCCESS",
        data: makeProfile("USER"),
      }),
    ),
  );
});

describe("MyPage", () => {
  describe("프로필 표시", () => {
    it("프로필 로드 후 이름이 표시된다", async () => {
      renderMyPage();
      await waitForProfile();
      expect(screen.getAllByText("홍길동").length).toBeGreaterThan(0);
    });

    it("프로필 로드 후 이메일이 표시된다", async () => {
      renderMyPage();
      await waitForProfile();
      expect(screen.getAllByText("goorm01@goorm.com").length).toBeGreaterThan(
        0,
      );
    });
  });
});
