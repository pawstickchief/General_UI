import { L as Layout } from "../../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<p>系统设置</p> <div class="statistics"><p>统计数据展示</p></div>`;
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
