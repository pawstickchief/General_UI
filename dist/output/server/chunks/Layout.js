import { Y as ensure_array_like, _ as stringify, R as pop, P as push, X as fallback, Z as bind_props, $ as copy_payload, a0 as assign_payload, S as slot } from "./index.js";
import { e as escape_html } from "./client.js";
import { a as attr } from "./attributes.js";
function Sidebar($$payload, $$props) {
  push();
  let menuItems = [];
  let activeMenu = null;
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };
  getCookie("auth_token");
  let expandedMenus = /* @__PURE__ */ new Set();
  const each_array = ensure_array_like(menuItems);
  $$payload.out += `<aside class="w-52 h-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText border-r border-borderLight dark:border-borderDark transition duration-300"><div class="p-4 text-2xl font-bold text-primary dark:text-accent">Admin Panel</div> <ul class="p-4 space-y-2"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let item = each_array[$$index_1];
    $$payload.out += `<li><a${attr("href", item.pathname)}${attr("class", `block px-4 py-2 rounded-md hover:bg-primary hover:text-lightBackground dark:hover:bg-accent dark:hover:text-darkBackground transition duration-300 ${stringify([activeMenu === item.pathname ? "font-bold" : ""].filter(Boolean).join(" "))}`)}>`;
    if (item.icon) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="mr-2">${escape_html(item.icon)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> ${escape_html(item.title)} `;
    if (item.children && item.children.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="ml-auto text-sm">${escape_html(expandedMenus.has(item.id) ? "▲" : "▼")}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></a> `;
    if (expandedMenus.has(item.id) && item.children?.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(item.children);
      $$payload.out += `<ul class="pl-4 border-l border-borderLight dark:border-borderDark ml-4 space-y-1"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let child = each_array_1[$$index];
        $$payload.out += `<li><a${attr("href", child.pathname)}${attr("class", `block px-4 py-2 rounded-md hover:bg-primary hover:text-lightBackground dark:hover:bg-accent dark:hover:text-darkBackground transition duration-300 ${stringify([activeMenu === child.pathname ? "font-bold" : ""].filter(Boolean).join(" "))}`)}>`;
        if (child.icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="mr-2">${escape_html(child.icon)}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> ${escape_html(child.title)}</a></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--></ul></aside>`;
  pop();
}
function Breadcrumbs($$payload, $$props) {
  push();
  let breadcrumbs = fallback($$props["breadcrumbs"], () => ["Home", "Dashboard"], true);
  const each_array = ensure_array_like(breadcrumbs);
  $$payload.out += `<nav class="px-4 py-2 bg-lightBackground dark:bg-darkBackground transition duration-300"><ol class="flex space-x-2 text-sm"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let crumb = each_array[index];
    $$payload.out += `<li class="flex items-center"><a href="#"${attr("class", `hover:underline text-secondary dark:text-grayDark hover:text-primary dark:hover:text-accent transition duration-300 font-medium ${stringify([
      index === breadcrumbs.length - 1 ? "font-semibold" : ""
    ].filter(Boolean).join(" "))}`)}>${escape_html(crumb)}</a> `;
    if (index < breadcrumbs.length - 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="mx-1 text-gray-400 dark:text-gray-500 transition duration-300">/</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--></ol></nav>`;
  bind_props($$props, { breadcrumbs });
  pop();
}
function UserModule($$payload, $$props) {
  push();
  let username = fallback($$props["username"], "admin");
  let email = fallback($$props["email"], "admin@email.com");
  let avatar = fallback($$props["avatar"], "/favicon.png");
  let status = fallback($$props["status"], "ok");
  $$payload.out += `<div class="flex items-center space-x-4 relative"><button class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `🌙`;
  }
  $$payload.out += `<!--]--></button> <div class="relative"><button class="flex items-center focus:outline-none"><div class="relative"><img${attr("src", avatar)} alt="Avatar" class="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"> `;
  if (status) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="absolute -bottom-1 -right-1 bg-green-500 text-xs text-white px-1 rounded-full shadow-md">${escape_html(status)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { username, email, avatar, status });
  pop();
}
function Header($$payload, $$props) {
  let breadcrumbs = fallback($$props["breadcrumbs"], () => [], true);
  let notifications = fallback($$props["notifications"], 0);
  $$payload.out += `<header class="flex flex-col space-y-2 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText border border-borderLight dark:border-borderDark rounded-md shadow-lg transition-all duration-300 ease-in-out"><div class="flex h-16 border border-borderLight dark:border-borderDark justify-between items-center gap-4">`;
  Breadcrumbs($$payload, { breadcrumbs });
  $$payload.out += `<!----> `;
  UserModule($$payload, { notifications });
  $$payload.out += `<!----></div></header>`;
  bind_props($$props, { breadcrumbs, notifications });
}
function Layout($$payload, $$props) {
  let breadcrumbs = [];
  let tabs = [];
  let activeTab = 0;
  let notifications = 3;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex min-h-screen w-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText transition-all duration-300 overflow-hidden">`;
    Sidebar($$payload2);
    $$payload2.out += `<!----> <div class="flex-1 flex flex-col overflow-hidden">`;
    Header($$payload2, {
      breadcrumbs,
      tabs,
      notifications,
      get activeTab() {
        return activeTab;
      },
      set activeTab($$value) {
        activeTab = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <main class="flex-1 overflow-auto p-4"><!---->`;
    slot($$payload2, $$props, "default", {});
    $$payload2.out += `<!----></main></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}
export {
  Layout as L
};
