import { createSafeActionClient } from "next-safe-action";

export const ac = createSafeActionClient({
  handleServerError(error) {
    console.error("Action error:", error.message);
    return "Oh no, something went wrong!";
  },
});
