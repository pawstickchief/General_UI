<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import TableSearch from './TableSearch.svelte';
    import TablePagination from './TablePagination.svelte';
    import TableExportPrint from './TableExportPrint.svelte';

    export let columns = [];
    export let rows = [];
    export let totalItems = 0;
    export let itemsPerPage = 10;
    export let currentPage = 1;
    export let searchFields = [];
    export let filterFields = [];
    export let config = {
        isSelection: true,
        isSerialNo: true,
        isOperate: true,
        loading: false,
    };

    const dispatch = createEventDispatcher();
    let selectedRows = new Set<string>();
    let sortedColumn = '';
    let sortDirection = 'asc';

    $: displayedRows = rows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: string) => {
        if (sortedColumn === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortedColumn = field;
            sortDirection = 'asc';
        }
        dispatch('sort', { sortedColumn, sortDirection });
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        if (checked) selectedRows.add(id);
        else selectedRows.delete(id);
        dispatch('select', { selectedRows: Array.from(selectedRows) });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) displayedRows.forEach(row => selectedRows.add(row.id));
        else displayedRows.forEach(row => selectedRows.delete(row.id));
        dispatch('select', { selectedRows: Array.from(selectedRows) });
    };

    const handlePageChange = (page: number) => {
        currentPage = page;
        dispatch('paginate', { currentPage });
    };

    const handleExport = () => {
        const csvContent = generateCSV(rows, columns);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'table-data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateCSV = (rows, columns) => {
        const headers = columns.map(col => col.label).join(',');
        const data = rows.map(row =>
            columns.map(col => (row[col.key] !== undefined ? `"${row[col.key]}"` : '')).join(',')
        );
        return [headers, ...data].join('\n');
    };

    const handlePrint = () => {
        const printableContent = document.querySelector('table').outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>打印表格</title>
                <style>
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>${printableContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
</script>

<div class="p-6 space-y-4 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText rounded-lg shadow-md">
    <!-- 搜索和操作按钮 -->
    <div class="flex justify-between items-center border-b pb-3">
        <TableSearch {searchFields} {filterFields} />

        <div class="space-x-2">
            <button
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
                    on:click={handleExport}
            >
                导出
            </button>
            <button
                    class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow"
                    on:click={handlePrint}
            >
                打印
            </button>
        </div>
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-600 dark:text-gray-300 border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
                {#if config.isSelection}
                    <th class="p-4">
                        <input type="checkbox" on:change={(e) => handleSelectAll(e.target.checked)} />
                    </th>
                {/if}
                {#if config.isSerialNo}
                    <th class="p-4 font-medium text-gray-800 dark:text-gray-200">序号</th>
                {/if}
                {#each columns as column}
                    <th
                            class="p-4 font-medium text-gray-800 dark:text-gray-200 cursor-pointer"
                            on:click={() => column.sortable && handleSort(column.key)}
                    >
                        {column.label}
                        {#if column.key === sortedColumn}
                            <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                        {/if}
                    </th>
                {/each}
                {#if config.isOperate}
                    <th class="p-4 font-medium text-gray-800 dark:text-gray-200">操作</th>
                {/if}
            </tr>
            </thead>
            <tbody>
            {#each displayedRows as row, index (row.id)}
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                    {#if config.isSelection}
                        <td class="p-4">
                            <input type="checkbox" on:change={(e) => handleSelectRow(row.id, e.target.checked)} />
                        </td>
                    {/if}
                    {#if config.isSerialNo}
                        <td class="p-4">{index + 1}</td>
                    {/if}
                    {#each columns as column}
                        <td class="p-4">{row[column.key]}</td>
                    {/each}
                    {#if config.isOperate}
                        <td class="p-4">
                            <button class="text-blue-500 hover:underline" on:click={() => dispatch('edit', { row })}>编辑</button>
                            <button class="text-red-500 hover:underline ml-2" on:click={() => dispatch('delete', { row })}>删除</button>
                        </td>
                    {/if}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <!-- 分页 -->
    <div class="mt-4">
        <TablePagination {currentPage} {itemsPerPage} {totalItems} on:pageChange={handlePageChange} />
    </div>
</div>


<style>
    .table-container {
        background-color: var(--bg-color);
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    table th, table td {
        text-align: center;
        vertical-align: middle;
    }

    table th {
        background-color: var(--header-bg-color);
        color: var(--header-text-color);
        padding: 12px;
        font-weight: 600;
    }

    table td {
        padding: 10px;
        color: var(--text-color);
    }

    /* Hover effect */
    table tr:hover {
        background-color: var(--hover-bg-color);
    }

    /* Buttons */
    button {
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover {
        transform: scale(1.05);
    }
</style>


