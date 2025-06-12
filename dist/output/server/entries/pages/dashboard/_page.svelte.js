import { e as escape_html } from "../../../chunks/client.js";
import { R as pop, P as push } from "../../../chunks/index.js";
import { L as Layout } from "../../../chunks/Layout.js";
function _page($$payload, $$props) {
  push();
  let stats = {
    totalUsers: 0,
    onlineUsers: 0,
    visitsToday: 0,
    lastLogin: "-"
  };
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };
  getCookie("auth_token");
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div class="p-4 space-y-6"><h1 class="text-2xl font-bold text-lightText dark:text-darkText">欢迎回来 👋</h1> <p class="text-gray-500 dark:text-gray-400">以下是平台的基础数据统计</p> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow"><h3 class="text-sm font-medium text-secondary dark:text-gray-400">总用户数</h3> <p class="text-2xl font-bold text-lightText dark:text-darkText">${escape_html(stats.totalUsers)}</p></div> <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow"><h3 class="text-sm font-medium text-secondary dark:text-gray-400">在线用户</h3> <p class="text-2xl font-bold text-lightText dark:text-darkText">${escape_html(stats.onlineUsers)}</p></div> <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow"><h3 class="text-sm font-medium text-secondary dark:text-gray-400">今日访问</h3> <p class="text-2xl font-bold text-lightText dark:text-darkText">${escape_html(stats.visitsToday)}</p></div> <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow"><h3 class="text-sm font-medium text-secondary dark:text-gray-400">上次登录</h3> <p class="text-2xl font-bold text-lightText dark:text-darkText">${escape_html(stats.lastLogin)}</p></div></div></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
