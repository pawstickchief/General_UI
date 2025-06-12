import { j as json } from "../../../../chunks/index2.js";
import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const buildMenuTree = (items, parentId = null) => {
  return items.filter((item) => item.parent_id === parentId).map((item) => ({
    ...item,
    children: buildMenuTree(items, item.id)
  }));
};
const POST = async ({ request }) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return json({ message: "Unauthorized: Missing token" }, { status: 401 });
    }
    const agent = new https.Agent({
      rejectUnauthorized: false
      // 跳过 SSL 验证
    });
    const response = await fetch("https://dev.pawstickchief.com:8007/menus", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      agent
      // 设置自定义 HTTPS Agent
    });
    if (!response.ok) {
      const errorData = await response.json();
      return json({ message: "Failed to fetch menu", details: errorData }, { status: response.status });
    }
    const menuData = await response.json();
    const menuTree = buildMenuTree(menuData.menus);
    return json(menuTree, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return json({ message: "Internal Server Error" }, { status: 500 });
  }
};
export {
  POST
};
