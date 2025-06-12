import { j as json } from "../../../../chunks/index2.js";
import https from "https";
import fetch from "node-fetch";
const POST = async ({ request }) => {
  try {
    const { username, password, rememberMe } = await request.json();
    console.log("📢 接收到登录请求:", { username, rememberMe });
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
      // 忽略 SSL 验证
    });
    const response = await fetch("https://dev.pawstickchief.com:8007/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        // ✅ 确保服务器返回 JSON
      },
      body: JSON.stringify({ username, password, rememberMe }),
      // ✅ 传递 rememberMe
      agent: httpsAgent
    });
    const result = await response.json();
    if (response.ok && result.code === 1e3 && result.data) {
      const token = result.data.token || "";
      const expiresIn = result.data.expiresIn ?? (rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60);
      console.log(`⏳ Token 过期时间 (秒): ${expiresIn}，大约 ${expiresIn / 3600} 小时`);
      return json(
        {
          token,
          expiresIn,
          // ✅ 传递给前端
          message: result.msg || "Login successful",
          success: true
        },
        { status: 200 }
      );
    }
    console.error("❌ 登录失败:", result?.msg || "Invalid credentials");
    return json(
      {
        message: result?.msg || "Invalid credentials",
        success: false
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("🚨 登录接口错误:", error);
    return json(
      {
        message: "Internal server error",
        success: false
      },
      { status: 500 }
    );
  }
};
export {
  POST
};
