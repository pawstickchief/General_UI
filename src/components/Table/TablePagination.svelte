<script lang="ts">
    export let currentPage = 1;
    export let itemsPerPage = 10;
    export let totalItems = 0;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            currentPage = page;
            dispatch('pageChange', { page });
        }
    };
</script>

<div class="flex justify-end items-center space-x-4 py-4">
    <!-- 上一页按钮 -->
    <button
            class="btn btn-sm pagination-btn"
            disabled={currentPage === 1}
            on:click={() => handlePageClick(currentPage - 1)}
    >
        上一页
    </button>

    <!-- 页码显示 -->
    <span class="text-sm text-gray-600 dark:text-gray-300">
        第 {currentPage} 页，共 {totalPages} 页
    </span>

    <!-- 下一页按钮 -->
    <button
            class="btn btn-sm pagination-btn"
            disabled={currentPage === totalPages}
            on:click={() => handlePageClick(currentPage + 1)}
    >
        下一页
    </button>
</div>

<style>
    .pagination-btn {
        background-color: var(--color-bg-button, #f3f4f6); /* 默认按钮背景色 */
        color: var(--color-text-button, #333); /* 默认文字颜色 */
        padding: 6px 12px;
        border: 1px solid var(--color-border-button, #ddd);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .pagination-btn:hover:not(:disabled) {
        background-color: var(--color-bg-hover, #e5e7eb); /* 悬停背景色 */
        color: var(--color-text-hover, #111); /* 悬停文字颜色 */
    }
    .pagination-btn:disabled {
        background-color: var(--color-bg-disabled, #e0e0e0); /* 禁用按钮背景色 */
        color: var(--color-text-disabled, #aaa); /* 禁用文字颜色 */
        cursor: not-allowed;
    }

    /* 深色主题支持 */
    :root.dark {
        --color-bg-button: #374151; /* 按钮背景色（深色主题） */
        --color-text-button: #e5e7eb; /* 按钮文字颜色（深色主题） */
        --color-border-button: #4b5563; /* 按钮边框颜色（深色主题） */
        --color-bg-hover: #475569; /* 按钮悬停背景色（深色主题） */
        --color-text-hover: #f9fafb; /* 按钮悬停文字颜色（深色主题） */
        --color-bg-disabled: #1f2937; /* 禁用按钮背景色（深色主题） */
        --color-text-disabled: #6b7280; /* 禁用按钮文字颜色（深色主题） */
    }
</style>
