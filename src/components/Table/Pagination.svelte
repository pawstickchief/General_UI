<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let currentPage = 1; // 当前页
    export let rowsPerPage = 25; // 每页显示行数，默认25
    export let total = 0; // 总数据量
    export let pageSizes = [10, 25, 50, 100]; // 支持的每页显示条数选项

    const dispatch = createEventDispatcher();
    const totalPages = Math.max(1, Math.ceil(total / rowsPerPage)); // 确保至少有一页

    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            dispatch('changePage', page); // 通知父组件页码更改
        }
    };

    const changeRowsPerPage = (event) => {
        const selectedValue = +event.target.value; // 转换为数字
        rowsPerPage = selectedValue; // 更新每页显示条目数
        dispatch('changeRowsPerPage', rowsPerPage); // 通知父组件更新
    };
</script>

<div class="pagination-container flex justify-between items-center mt-4 p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md rounded-lg">
    <!-- 左侧分页信息 -->
    <div class="flex items-center space-x-4">
        <span>总计: {total} 条数据</span>
        <label for="rowsPerPage" class="text-sm">
            每页显示:
            <select
                    id="rowsPerPage"
                    bind:value={rowsPerPage}
                    on:change={changeRowsPerPage}
                    class="ml-2 border rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1"
            >
                {#each pageSizes as size}
                    <option value={size}>{size}</option>
                {/each}
            </select>
        </label>
    </div>

    <!-- 右侧分页按钮 -->
    <div class="flex items-center space-x-4">
        <button
                on:click={() => changePage(currentPage - 1)}
                disabled={currentPage <= 1}
                class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            上一页
        </button>

        <span>
            第 <strong>{currentPage}</strong> 页，共 <strong>{totalPages}</strong> 页
        </span>

        <button
                on:click={() => changePage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            下一页
        </button>
    </div>
</div>

<style>
    .pagination-container {
        font-size: 0.875rem; /* 调整字体大小 */
    }

    button {
        min-width: 80px; /* 确保按钮宽度一致 */
        text-align: center;
    }

    span {
        font-size: 1rem; /* 提高页码显示的可读性 */
    }

    select {
        cursor: pointer;
    }
</style>
