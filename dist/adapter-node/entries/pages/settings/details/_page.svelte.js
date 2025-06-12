import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/client.js";
import { R as pop, P as push } from "../../../../chunks/index.js";
import { L as Layout } from "../../../../chunks/Layout.js";
import { F as FormSearch, a as FormTable } from "../../../../chunks/FormSearch.js";
function _page($$payload, $$props) {
  push();
  let columns = [
    { label: "用户ID", key: "id", sortable: true },
    {
      label: "用户名",
      key: "username",
      sortable: true
    },
    { label: "邮箱", key: "email", sortable: true },
    { label: "角色", key: "role", sortable: false },
    {
      label: "创建时间",
      key: "created_at",
      sortable: true
    }
  ];
  let rows = [];
  let totalItems = 0;
  let currentPage = 1;
  let itemsPerPage = 5;
  let totalPages = 1;
  let searchParams = [
    { key: "username", label: "用户名" },
    { key: "email", label: "邮箱" }
  ];
  let searchQuery = {};
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };
  const fetchData = async () => {
    try {
      const token = getCookie("auth_token");
      if (!token) {
        console.error("Missing auth token");
        return;
      }
      const requestBody = {
        page: Number(currentPage),
        limit: Number(itemsPerPage),
        filters: searchQuery
        // ✅ 传递搜索参数
      };
      console.log("📡 发送请求参数:", requestBody);
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data from /api/users: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ 后端返回数据:", data);
      rows = data.users.map((item) => ({
        id: item.id,
        username: item.username,
        email: item.email,
        role: item.role,
        created_at: new Date(item.created_at).toLocaleString()
      }));
      totalItems = data.total ?? 0;
      totalPages = Math.ceil(totalItems / itemsPerPage);
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };
  fetchData();
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div>`;
      FormSearch($$payload2, { searchParams });
      $$payload2.out += `<!----> `;
      FormTable($$payload2, { columns, rows });
      $$payload2.out += `<!----> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="pagination-container flex justify-between items-center mt-4 svelte-h4va85"><div class="flex items-center"><label for="itemsPerPage" class="mr-2 text-lightText dark:text-darkText">每页显示</label> <select id="itemsPerPage" class="p-2 border border-borderLight dark:border-borderDark rounded svelte-h4va85"><option${attr("value", 5)}>5</option><option${attr("value", 10)}>10</option><option${attr("value", 20)}>20</option><option${attr("value", 50)}>50</option></select> <span class="ml-2 text-lightText dark:text-darkText">条</span></div> <div class="pagination-buttons flex items-center"><button class="btn-pagination svelte-h4va85"${attr("disabled", currentPage <= 1, true)}>上一页</button> <span class="mx-4 text-lightText dark:text-darkText">第 ${escape_html(currentPage)} 页</span> <button class="btn-pagination svelte-h4va85"${attr("disabled", currentPage >= Math.ceil(totalItems / itemsPerPage), true)}>下一页</button></div></div></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
