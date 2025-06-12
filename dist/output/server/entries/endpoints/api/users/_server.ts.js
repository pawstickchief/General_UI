import { j as json } from "../../../../chunks/index2.js";
import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const POST = async ({ request }) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return json({ message: "Unauthorized: Missing token" }, { status: 401 });
    }
    const body = await request.json();
    const { page, limit, filters } = body;
    if (!page || !limit) {
      return json({ message: "Bad Request: Missing page or limit parameters" }, { status: 400 });
    }
    const agent = new https.Agent({
      rejectUnauthorized: false
      // 跳过 SSL 验证
    });
    const response = await fetch("https://dev.pawstickchief.com:8007/users", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ page, limit, filters }),
      agent
    });
    if (!response.ok) {
      const errorData = await response.json();
      return json({ message: "Failed to fetch users", details: errorData }, { status: response.status });
    }
    const userData = await response.json();
    return json(userData, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return json({ message: "Internal Server Error", details: error.message }, { status: 500 });
  }
};
export {
  POST
};
