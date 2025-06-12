import { a as attr } from "../../../chunks/attributes.js";
import { R as pop, P as push, V as store_get, W as unsubscribe_stores } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import { w as writable } from "../../../chunks/exports.js";
const theme = writable("light");
function LoginForm($$payload, $$props) {
  push();
  let username = "";
  let password = "";
  let rememberMe = false;
  $$payload.out += `<div class="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-sm mx-auto"><h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">登录</h2> <input type="text" placeholder="用户名"${attr("value", username)} class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"> <input type="password" placeholder="密码"${attr("value", password)} class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"> <div class="flex items-center justify-between text-sm"><label class="flex items-center space-x-2"><input type="checkbox"${attr("checked", rememberMe, true)} class="form-checkbox text-primary"> <span class="text-gray-600 dark:text-gray-300">记住登录 7 天</span></label> <a href="/forgot-password" class="text-primary hover:underline dark:text-blue-400">忘记密码?</a></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button class="w-full p-3 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-300">登录</button> <p class="text-xs text-center text-gray-500 dark:text-gray-400">登录即表示您同意我们的 <a href="/privacy-policy" class="text-primary hover:underline dark:text-blue-400">隐私政策</a> 和 <a href="/terms" class="text-primary hover:underline dark:text-blue-400">服务条款</a>。</p></div>`;
  pop();
}
function ThemeToggle($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<button class="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">`;
  if (store_get($$store_subs ??= {}, "$theme", theme) === "light") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m0 16v2m8-8h2m-18 0H2m16.364-6.364l1.414 1.414M4.222 19.778l1.414-1.414m12.728 0l1.414 1.414M4.222 4.222l1.414 1.414M12 6a6 6 0 110 12 6 6 0 010-12z"></path>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3.3a9 9 0 100 17.4A7.5 7.5 0 1112 3.3z"></path>`;
  }
  $$payload.out += `<!--]--></svg></button>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300 relative"><div class="absolute top-6 left-6 flex items-center space-x-2"><img src="/favicon.png" alt="Logo" class="w-8 h-8"> <span class="text-2xl font-bold text-primary dark:text-accent">干饭咪</span></div> <div class="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-6 space-y-6 md:space-y-0"><div class="flex-1 text-center md:text-left space-y-4"><h1 class="text-4xl font-bold">欢迎回来 👋</h1> <p class="text-gray-600 dark:text-gray-400">请输入您的账户信息以开始管理您的项目</p></div> <div class="flex-1">`;
  LoginForm($$payload);
  $$payload.out += `<!----> <div class="flex justify-center mt-4">`;
  ThemeToggle($$payload);
  $$payload.out += `<!----></div></div></div></div>`;
}
export {
  _page as default
};
