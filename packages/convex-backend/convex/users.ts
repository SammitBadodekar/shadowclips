import { query } from "./_generated/server";
import { authComponent } from "./auth";

// Query to check if users exist in the Better Auth component
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    // This will query users from the Better Auth component tables
    const user = await authComponent.getAuthUser(ctx);

    return {
      currentUser: user,
      message: "If you see a user here, auth is working and storing data in the component",
    };
  },
});

// Query to test component access directly
export const testComponentAccess = query({
  args: {},
  handler: async (ctx) => {
    try {
      const user = await authComponent.getAuthUser(ctx);
      return {
        success: true,
        hasUser: !!user,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: String(error),
      };
    }
  },
});
