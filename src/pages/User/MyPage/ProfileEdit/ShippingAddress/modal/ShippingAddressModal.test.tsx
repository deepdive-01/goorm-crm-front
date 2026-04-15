import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "@vapor-ui/core";
import { HttpResponse, http } from "msw";
import { describe, expect, it, vi } from "vitest";

import { server } from "../../../../../../mocks/server";
import {
  UserProvider,
  useUserContext,
} from "../../../../../../context/UserContext";
import ShippingAddressModal from "./ShippingAddressModal";

/**
 * useShippingAddress의 useState 초기값은 profile이 로드된 시점에 결정됨
 * 프로필 로드 전에 모달이 렌더링되면 초기값이 빈 문자열이 되므로,
 * 프로필이 로드된 후에만 모달을 렌더링하는 래퍼를 사용
 *
 * Dialog.Title/Close 등 vapor-ui Dialog 컴포넌트는 Dialog.Root 컨텍스트가 필요하므로
 * Dialog.Root open으로 감싸서 렌더링
 */
function ModalAfterProfileLoad({ onClose }: { onClose?: () => void }) {
  const { profile } = useUserContext();
  if (!profile) return <div>프로필 로딩 중</div>;
  return (
    <Dialog.Root open>
      <ShippingAddressModal onClose={onClose} />
    </Dialog.Root>
  );
}

const renderModal = (onClose?: () => void) =>
  render(
    <UserProvider>
      <ModalAfterProfileLoad onClose={onClose} />
    </UserProvider>,
  );

const waitForModal = () =>
  waitFor(() =>
    expect(screen.queryByText("프로필 로딩 중")).not.toBeInTheDocument(),
  );

// window.daum.Postcode 전역 모킹
// new 연산자로 호출되므로 반드시 function 키워드 사용 (arrow function은 생성자 불가)
const mockOpen = vi.fn();
vi.stubGlobal("daum", {
  Postcode: vi.fn().mockImplementation(function ({
    oncomplete,
  }: {
    oncomplete: (data: {
      zonecode: string;
      roadAddress: string;
      jibunAddress: string;
    }) => void;
  }) {
    return {
      open: () => {
        mockOpen();
        oncomplete({
          zonecode: "12345",
          roadAddress: "서울시 서초구 서초대로 1",
          jibunAddress: "",
        });
      },
    };
  }),
});

describe("ShippingAddressModal", () => {
  describe("초기값", () => {
    it("프로필의 수령인 이름이 input에 표시된다", async () => {
      renderModal();
      await waitForModal();
      expect(screen.getByPlaceholderText("이름")).toHaveValue("홍길동");
    });

    it("프로필의 전화번호가 input에 표시된다", async () => {
      renderModal();
      await waitForModal();
      expect(screen.getByPlaceholderText("010-0000-0000")).toHaveValue(
        "010-1234-5678",
      );
    });

    it("프로필의 도로명 주소가 input에 표시된다", async () => {
      renderModal();
      await waitForModal();
      expect(screen.getByPlaceholderText("도로명 주소")).toHaveValue(
        "서울시 강남구 테헤란로 123",
      );
    });

    it("프로필의 우편번호가 input에 표시된다", async () => {
      renderModal();
      await waitForModal();
      expect(screen.getByPlaceholderText("우편번호")).toHaveValue("06234");
    });

    it("프로필의 상세 주소가 input에 표시된다", async () => {
      renderModal();
      await waitForModal();
      expect(
        screen.getByPlaceholderText("상세 주소를 입력해주세요"),
      ).toHaveValue("101동 202호");
    });
  });

  describe("주소 검색", () => {
    it("주소 검색 버튼 클릭 시 Daum 우편번호 팝업이 열린다", async () => {
      const user = userEvent.setup();
      renderModal();
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "주소 검색" }));

      expect(mockOpen).toHaveBeenCalled();
    });

    it("주소 검색 완료 후 우편번호와 도로명 주소가 업데이트된다", async () => {
      const user = userEvent.setup();
      renderModal();
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "주소 검색" }));

      await waitFor(() => {
        expect(screen.getByPlaceholderText("우편번호")).toHaveValue("12345");
        expect(screen.getByPlaceholderText("도로명 주소")).toHaveValue(
          "서울시 서초구 서초대로 1",
        );
      });
    });
  });

  describe("저장 (handleSave)", () => {
    it("저장 성공 시 onClose가 호출된다", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal(onClose);
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "저장" }));

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it("저장 중에는 버튼이 비활성화된다", async () => {
      server.use(
        http.patch("*/api/v1/users/me", async () => {
          await new Promise((r) => setTimeout(r, 100));
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_UPDATE_SUCCESS",
            data: { name: "홍길동", phone: "010-1234-5678", address: "도로명" },
          });
        }),
      );

      const user = userEvent.setup();
      renderModal();
      await waitForModal();

      user.click(screen.getByRole("button", { name: "저장" }));

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "저장 중..." }),
        ).toBeDisabled();
      });
    });

    it("저장 실패 시 에러 메시지가 표시된다", async () => {
      server.use(
        http.patch("*/api/v1/users/me", () => {
          return HttpResponse.json(
            {
              code: "TOKEN_EXPIRED",
              message: "세션이 만료되었습니다. 다시 로그인해주세요.",
            },
            { status: 401 },
          );
        }),
      );

      const user = userEvent.setup();
      renderModal();
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "저장" }));

      await waitFor(() => {
        expect(
          screen.getByText("세션이 만료되었습니다. 다시 로그인해주세요."),
        ).toBeInTheDocument();
      });
    });

    it("저장 실패 시 onClose가 호출되지 않는다", async () => {
      server.use(
        http.patch("*/api/v1/users/me", () => {
          return HttpResponse.json({}, { status: 500 });
        }),
      );

      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal(onClose);
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "저장" }));

      await waitFor(() => {
        expect(
          screen.getByText("저장에 실패했습니다. 다시 시도해주세요."),
        ).toBeInTheDocument();
      });
      expect(onClose).not.toHaveBeenCalled();
    });

    it("저장 시 우편번호·도로명 주소·상세 주소를 \\n으로 합쳐 전송한다", async () => {
      let capturedBody: Record<string, string> = {};
      server.use(
        http.patch("*/api/v1/users/me", async ({ request }) => {
          capturedBody = (await request.json()) as Record<string, string>;
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_UPDATE_SUCCESS",
            data: {
              name: capturedBody.name,
              phone: capturedBody.phone,
              address: capturedBody.address,
            },
          });
        }),
      );

      const user = userEvent.setup();
      renderModal();
      await waitForModal();

      await user.click(screen.getByRole("button", { name: "저장" }));

      await waitFor(() => {
        expect(capturedBody.address).toBe(
          "06234\n서울시 강남구 테헤란로 123\n101동 202호",
        );
      });
    });
  });
});
