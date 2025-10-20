import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

// User
export const shouldBeUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  // if not logged in
  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  c.set("userId", auth.userId);

  await next();
});

// Admin
export const shouldBeAdmin = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  // if not logged in
  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  // if not admin or authorized
  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "Unauthorized User!" });
  }

  c.set("userId", auth.userId);

  await next();
});
