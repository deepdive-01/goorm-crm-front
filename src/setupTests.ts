import "@testing-library/jest-dom";

// TODO: MSW - API 테스트 (실제 API 연결 후 삭제 예정)
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  localStorage.setItem("access_token", "mock-token");
});

afterEach(() => {
  localStorage.clear();
});
