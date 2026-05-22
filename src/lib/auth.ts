import { cookies } from "next/headers";

/**
 * Returns the current user id.
 *
 * For production, replace this with `auth()` from `@clerk/nextjs/server`:
 *   import { auth } from "@clerk/nextjs/server";
 *   const { userId } = auth();
 *
 * Until Clerk is wired up, we use a stable per-browser id stored in a cookie
 * so the Notion integration is end-to-end testable in development.
 */
export async function getCurrentUserId(): Promise<string> {
  const store = await cookies();
  let id = store.get("insightx_uid")?.value;
  if (!id) {
    id = `dev_${crypto.randomUUID()}`;
    store.set("insightx_uid", id, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
  return id;
}
