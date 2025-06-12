import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/client.js";
import { R as pop, P as push } from "../../../../chunks/index.js";
import { L as Layout } from "../../../../chunks/Layout.js";
import { F as FormSearch, a as FormTable } from "../../../../chunks/FormSearch.js";
function _page($$payload, $$props) {
  push();
  let columns = [
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
  let token = null;
  let currentPage = 1;
  let itemsPerPage = 5;
  let searchParams = [
    { key: "username", label: "用户名" },
    { key: "email", label: "邮箱" }
  ];
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };
  token = getCookie("auth_token");
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ page: currentPage, limit: itemsPerPage })
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data from /api/users: ${response.status}`);
      }
      const data = await response.json();
      rows = data.users.map((item) => ({
        id: item.id,
        username: item.username,
        email: item.email,
        role: item.role,
        created_at: new Date(item.created_at).toLocaleString()
        // 格式化日期
      }));
      totalItems = data.total;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  fetchData();
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div>`;
      FormSearch($$payload2, { searchParams });
      $$payload2.out += `<!----> `;
      FormTable($$payload2, { columns, rows });
      $$payload2.out += `<!----> <div class="pagination-container flex justify-between items-center mt-4 svelte-qw2lxv"><div class="flex items-center"><label for="itemsPerPage" class="mr-2 text-lightText dark:text-darkText">每页显示</label> <select id="itemsPerPage" class="p-2 border border-borderLight dark:border-borderDark rounded svelte-qw2lxv"><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option></select> <span class="ml-2 text-lightText dark:text-darkText">条</span></div> <div class="pagination-buttons flex items-center"><button class="btn-pagination svelte-qw2lxv"${attr("disabled", currentPage <= 1, true)}>上一页</button> <span class="mx-4 text-lightText dark:text-darkText">第 ${escape_html(currentPage)} 页</span> <button class="btn-pagination svelte-qw2lxv"${attr("disabled", currentPage >= Math.ceil(totalItems / itemsPerPage), true)}>下一页</button></div></div></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
