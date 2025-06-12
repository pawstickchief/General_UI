import { L as Layout } from "../../../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<p>用户信息</p> <div class="statistics"><p>数据展示</p></div>`;
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
