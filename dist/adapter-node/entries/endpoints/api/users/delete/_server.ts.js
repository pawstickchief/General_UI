import { j as json } from "../../../../../chunks/index2.js";
import https from "https";
const POST = async ({ request }) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return json({ message: "Unauthorized: Missing token" }, { status: 401 });
    }
    const { id } = await request.json();
    if (!id) {
      return json({ message: "Bad Request: Missing user ID" }, { status: 400 });
    }
    const agent = new https.Agent({
      rejectUnauthorized: false
      // 跳过 SSL 验证
    });
    const response = await fetch("https://dev.pawstickchief.com:8007/users/delete", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }),
      agent
    });
    if (!response.ok) {
      const errorData = await response.json();
      return json({ message: "Failed to delete user", details: errorData }, { status: response.status });
    }
    return json({ message: `User ID ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return json({ message: "Internal Server Error", details: error.message }, { status: 500 });
  }
};
export {
  POST
};
