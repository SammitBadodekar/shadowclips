import { query } from "./_generated/server";
import { authComponent } from "./auth";

// Query to check if users exist in the Better Auth component
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    // This will query users from the Better Auth component tables
    console.log("here received request");

    try {
      const user = await authComponent.getAuthUser(ctx);
      console.log("here received request 2", user);

      return {
        authenticated: true,
        currentUser: user,
        message: "User is authenticated and stored in Better Auth component",
      };
    } catch (error) {
      console.log("User not authenticated", error);
      return {
        authenticated: false,
        currentUser: null,
        message: "User is not authenticated. Please sign in first.",
        error: String(error),
      };
    }
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
