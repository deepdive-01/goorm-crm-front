import { setupServer } from "msw/node";

import { authHandlers } from "./handlers/auth";
import { passwordResetHandlers } from "./handlers/passwordReset";
import { signupHandlers } from "./handlers/signup";
import { dashboardHandlers } from "./handlers/dashboard";
import { membersHandlers } from "./handlers/members";

export const server = setupServer(
  ...authHandlers,
  ...signupHandlers,
  ...passwordResetHandlers,
  ...dashboardHandlers,
  ...membersHandlers,
);
