<script lang="ts">
    export let columns = []; // 表格列
    export let rows = []; // 表格行

    let selectedRows: Set<number> = new Set(); // 记录选中的行 ID
    let visibleColumns = [...columns]; // 动态显示的列
    let allSelected = false; // 是否全选

    // 切换列显示状态
    const toggleColumnVisibility = (key: string) => {
        visibleColumns = columns.filter(col => col.key === key ? !visibleColumns.includes(col) : visibleColumns.includes(col));
    };

    // 处理行选择
    const toggleRowSelection = (id: number) => {
        if (selectedRows.has(id)) {
            selectedRows.delete(id);
        } else {
            selectedRows.add(id);
        }
    };

    // 全选或取消全选
    const toggleAllSelection = () => {
        if (allSelected) {
            selectedRows.clear();
        } else {
            rows.forEach(row => selectedRows.add(row.id));
        }
        allSelected = !allSelected;
    };

    // 批量删除
    const deleteSelected = () => {
        rows = rows.filter(row => !selectedRows.has(row.id));
        selectedRows.clear();
        allSelected = false;
    };

    // 单行删除
    const deleteRow = (id: number) => {
        rows = rows.filter(row => row.id !== id);
        selectedRows.delete(id);
    };

    // 编辑操作（占位，具体逻辑自行实现）
    const editRow = (id: number) => {
        alert(`编辑行 ID: ${id}`);
    };
</script>

<div class="table-container bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText shadow-md rounded-lg p-4">
    <!-- 列选择功能 -->
    <div class="mb-4">
        <h4 class="font-semibold">显示列</h4>
        <div class="flex gap-2 flex-wrap">
            {#each columns as column}
                <label class="inline-flex items-center">
                    <input type="checkbox" checked={visibleColumns.includes(column)} on:change={() => toggleColumnVisibility(column.key)} />
                    <span class="ml-2">{column.label}</span>
                </label>
            {/each}
        </div>
    </div>

    <!-- 表格 -->
    <div class="table-wrapper overflow-auto">
        <table class="w-full border-collapse bg-cardLight dark:bg-cardDark text-lightText dark:text-darkText rounded-lg overflow-hidden shadow-lg">
            <thead class="bg-grayLight dark:bg-borderDark">
            <tr>
                <!-- 多选复选框列 -->
                <th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold">
                    <input type="checkbox" bind:checked={allSelected} on:change={toggleAllSelection} />
                </th>
                {#each visibleColumns as column}
                    <th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold">
                        {column.label}
                    </th>
                {/each}
                <!-- 操作列 -->
                <th class="border-b border-borderLight dark:border-borderDark p-3 text-left font-semibold fixed-right">
                    操作
                </th>
            </tr>
            </thead>
            <tbody>
            {#if rows.length > 0}
                {#each rows as row (row.id)}
                    <tr class="hover:bg-grayLight dark:hover:bg-gray-700 transition duration-300">
                        <!-- 复选框 -->
                        <td class="border-b border-borderLight dark:border-borderDark p-3">
                            <input type="checkbox" checked={selectedRows.has(row.id)} on:change={() => toggleRowSelection(row.id)} />
                        </td>
                        <!-- 动态显示的列 -->
                        {#each visibleColumns as column}
                            <td class="border-b border-borderLight dark:border-borderDark p-3">
                                {row[column.key]}
                            </td>
                        {/each}
                        <!-- 操作列 -->
                        <td class="border-b border-borderLight dark:border-borderDark p-3 fixed-right">
                            <button class="btn-edit" on:click={() => editRow(row.id)}>编辑</button>
                            <button class="btn-delete" on:click={() => deleteRow(row.id)}>删除</button>
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan={visibleColumns.length + 2} class="text-center p-4 text-secondary dark:text-neutral">
                        暂无数据
                    </td>
                </tr>
            {/if}
            </tbody>
        </table>
    </div>

    <!-- 批量操作 -->
    <div class="mt-4 flex justify-end gap-2">
        <button class="btn-delete" on:click={deleteSelected} disabled={selectedRows.size === 0}>
            批量删除
        </button>
    </div>
</div>

<style>
    .table-wrapper {
        overflow-x: auto;
        white-space: nowrap;
    }

    .fixed-right {
        position: sticky;
        right: 0;
        background: var(--cardLight);
        z-index: 10;
    }

    th, td {
        text-align: left;
        padding: 0.75rem;
        border-bottom: 1px solid;
    }

    th {
        font-weight: 600;
        text-transform: uppercase;
    }

    td {
        font-size: 0.875rem;
    }

    .btn-edit {
        background-color: #3b82f6;
        color: #fff;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        margin-right: 0.5rem;
    }

    .btn-delete {
        background-color: #ef4444;
        color: #fff;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }

    .btn-edit:hover, .btn-delete:hover {
        opacity: 0.8;
    }

    .table-container {
        border-radius: 8px;
        padding: 1.5rem;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
    }

    tr:hover td {
        transition: background-color 0.3s;
    }
</style>
