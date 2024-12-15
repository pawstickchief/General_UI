<!-- src/components/Tabs.svelte -->
<script>
    // 标签页数据
    export let tabs = []; // [{ title: "分析页" }, { title: "工作台" }, ...]
    export let activeTab = 0; // 当前选中的标签索引
    export let onClose; // 关闭标签回调

    // 切换标签页
    const switchTab = (index) => {
        activeTab = index;
    };

    // 关闭标签页
    const closeTab = (index) => {
        if (onClose) {
            onClose(index);
        }
    };
</script>

<!-- 标签页容器 -->
<div
        class="flex items-center space-x-2 overflow-x-auto p-2
           bg-lightBackground dark:bg-darkBackground
           border-b border-borderLight dark:border-borderDark
           shadow-sm transition duration-300"
>
    {#each tabs as tab, index}
        <div
                class="flex items-center px-4 py-1 rounded-md cursor-pointer
                   border border-transparent hover:border-borderLight dark:hover:border-gray-600
                   hover:bg-grayLight dark:hover:bg-gray-700
                   transition duration-200"
                class:selected={index === activeTab}
                on:click={() => switchTab(index)}
        >
            <!-- 标签标题 -->
            <span
                    class="text-sm text-lightText dark:text-darkText
                       transition duration-200"
            >
                {tab.title}
            </span>

            <!-- 关闭按钮 -->
            <button
                    class="ml-2 text-gray-400 dark:text-gray-500
                       hover:text-danger dark:hover:text-danger focus:outline-none
                       transition duration-200"
                    on:click|stopPropagation={() => closeTab(index)}
            >
                ✕
            </button>
        </div>
    {/each}
</div>

<style>
    /* 选中标签的样式 */
    .selected {
        @apply bg-primary dark:bg-gray-800 text-white font-medium
        border border-primary dark:border-gray-600
        shadow-md transition duration-300;
    }
</style>


