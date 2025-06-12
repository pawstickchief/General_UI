import { X as fallback, Y as ensure_array_like, Z as bind_props, R as pop, P as push } from "./index.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./client.js";
function FormTable($$payload, $$props) {
  push();
  let columns = fallback($$props["columns"], () => [], true);
  let rows = fallback($$props["rows"], () => [], true);
  let selectedRows = /* @__PURE__ */ new Set();
  let visibleColumns = [...columns];
  let allSelected = false;
  const each_array = ensure_array_like(columns);
  const each_array_1 = ensure_array_like(visibleColumns);
  $$payload.out += `<div class="table-container bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText shadow-md rounded-lg p-4 svelte-12m41q9"><div class="mb-4"><h4 class="font-semibold">显示列</h4> <div class="flex gap-2 flex-wrap"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let column = each_array[$$index];
    $$payload.out += `<label class="inline-flex items-center"><input type="checkbox"${attr("checked", visibleColumns.includes(column), true)}> <span class="ml-2">${escape_html(column.label)}</span></label>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="table-wrapper overflow-auto svelte-12m41q9"><table class="w-full border-collapse bg-cardLight dark:bg-cardDark text-lightText dark:text-darkText rounded-lg overflow-hidden shadow-lg svelte-12m41q9"><thead class="bg-grayLight dark:bg-borderDark"><tr><th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold svelte-12m41q9"><input type="checkbox"${attr("checked", allSelected, true)}></th><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let column = each_array_1[$$index_1];
    $$payload.out += `<th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold svelte-12m41q9">${escape_html(column.label)}</th>`;
  }
  $$payload.out += `<!--]--><th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold fixed-right svelte-12m41q9">操作</th></tr></thead><tbody>`;
  if (rows.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(rows);
    $$payload.out += `<!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let row = each_array_2[$$index_3];
      const each_array_3 = ensure_array_like(visibleColumns);
      $$payload.out += `<tr class="hover:bg-grayLight dark:hover:bg-gray-700 transition duration-300 svelte-12m41q9"><td class="border-b border-borderLight dark:border-borderDark p-3 svelte-12m41q9"><input type="checkbox"${attr("checked", selectedRows.has(row.id), true)}></td><!--[-->`;
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let column = each_array_3[$$index_2];
        $$payload.out += `<td class="border-b border-borderLight dark:border-borderDark p-3 svelte-12m41q9">${escape_html(row[column.key])}</td>`;
      }
      $$payload.out += `<!--]--><td class="border-b border-borderLight dark:border-borderDark p-3 fixed-right svelte-12m41q9"><button class="btn-edit svelte-12m41q9">编辑</button> <button class="btn-delete svelte-12m41q9">删除</button></td></tr>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr class="svelte-12m41q9"><td${attr("colspan", visibleColumns.length + 2)} class="text-center p-4 text-secondary dark:text-neutral svelte-12m41q9">暂无数据</td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div> <div class="mt-4 flex justify-end gap-2"><button class="btn-add svelte-12m41q9">添加用户</button> <button class="btn-delete svelte-12m41q9"${attr("disabled", selectedRows.size === 0, true)}>批量删除</button></div></div>`;
  bind_props($$props, { columns, rows });
  pop();
}
function FormSearch($$payload, $$props) {
  push();
  let searchParams = fallback($$props["searchParams"], () => [], true);
  let searchInputs = {};
  const each_array = ensure_array_like(searchParams);
  $$payload.out += `<div class="search-container bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText p-6 rounded-lg shadow-lg space-y-6 svelte-1b03mkc"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let param = each_array[$$index];
    $$payload.out += `<div class="flex flex-col space-y-1"><label${attr("for", param.key)} class="text-sm font-medium text-lightText dark:text-darkText">${escape_html(param.label)}:</label> <input${attr("id", param.key)} type="text"${attr("value", searchInputs[param.key])}${attr("placeholder", `请输入${param.label}`)} class="border border-borderLight dark:border-borderDark rounded-md p-2 w-full bg-cardLight dark:bg-cardDark text-lightText dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition svelte-1b03mkc"></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex justify-end space-x-4"><button class="bg-primary hover:bg-blue-600 text-accent px-4 py-2 rounded-md transition shadow-sm">搜索</button> <button class="bg-neutral dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-lightText dark:text-darkText px-4 py-2 rounded-md transition shadow-sm">重置</button></div></div>`;
  bind_props($$props, { searchParams });
  pop();
}
export {
  FormSearch as F,
  FormTable as a
};
