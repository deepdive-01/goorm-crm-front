import { setupServer } from "msw/node";

import { authHandlers } from "./handlers/auth";
import { passwordResetHandlers } from "./handlers/passwordReset";
import { signupHandlers } from "./handlers/signup";

export const server = setupServer(
  ...authHandlers,
  ...signupHandlers,
  ...passwordResetHandlers,
);
