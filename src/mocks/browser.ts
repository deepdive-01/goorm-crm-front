import { setupWorker } from "msw/browser";

import { authHandlers } from "./handlers/auth";
import { passwordResetHandlers } from "./handlers/passwordReset";
import { signupHandlers } from "./handlers/signup";
import { dashboardHandlers } from "./handlers/dashboard";
import { membersHandlers } from "./handlers/members";
import { memberManagementHandlers } from "./handlers/memberManagement";
import { adminManagementHandlers } from "./handlers/adminManagement";

export const worker = setupWorker(
  ...authHandlers,
  ...signupHandlers,
  ...passwordResetHandlers,
  ...dashboardHandlers,
  ...membersHandlers,
  ...memberManagementHandlers,
  ...adminManagementHandlers,
);
