import { r as redirect } from "./index2.js";
const handle = async ({ event, resolve }) => {
  const { url, cookies } = event;
  const pathname = url.pathname;
  console.log("🔍 Checking path:", pathname);
  if (pathname.startsWith("/api") || pathname.startsWith("/login") || pathname.startsWith("/static")) {
    console.log("✅ Path is allowed without authentication:", pathname);
    return resolve(event);
  }
  const authToken = cookies.get("auth_token");
  const tokenExpiration = cookies.get("token_expiration");
  console.log("🔑 auth_token:", authToken ? "存在" : "不存在");
  console.log("⏳ token_expiration:", tokenExpiration || "不存在");
  if (tokenExpiration) {
    const expirationTime = parseInt(tokenExpiration);
    if (Date.now() > expirationTime) {
      console.log("🚨 Token 已过期，自动退出");
      cookies.set("auth_token", "", { path: "/", maxAge: 0 });
      cookies.set("token_expiration", "", { path: "/", maxAge: 0 });
      throw redirect(302, "/login");
    }
  }
  if (!authToken) {
    console.log("❌ No valid token found, redirecting to login");
    throw redirect(302, "/login");
  }
  return resolve(event);
};
export {
  handle
};
