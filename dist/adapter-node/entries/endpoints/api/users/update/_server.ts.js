import { j as json } from "../../../../../chunks/index2.js";
import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const POST = async ({ request }) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return json({ message: "Unauthorized: Missing token" }, { status: 401 });
    }
    const { id, username, email, role, password } = await request.json();
    if (!id || !username || !email || !role) {
      return json({ message: "Bad Request: Missing required fields" }, { status: 400 });
    }
    const agent = new https.Agent({
      rejectUnauthorized: false
      // 跳过 SSL 验证
    });
    const response = await fetch("https://dev.pawstickchief.com:8007/users/update", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, username, email, role, password }),
      agent
    });
    if (!response.ok) {
      const errorData = await response.json();
      return json({ message: "Failed to update user", details: errorData }, { status: response.status });
    }
    return json({ message: `User ${username} updated successfully` }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return json({ message: "Internal Server Error", details: error.message }, { status: 500 });
  }
};
export {
  POST
};
