<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let searchParams = []; // 搜索字段参数
    let searchInputs: Record<string, string> = {}; // 存储用户输入的搜索条件

    const dispatch = createEventDispatcher(); // 创建事件分发器

    // 搜索逻辑
    const handleSearch = () => {
        console.log("搜索参数:", searchInputs);
        dispatch("search", { filters: searchInputs }); // 触发搜索事件，传递搜索数据
    };

    // 重置搜索
    const handleReset = () => {
        searchInputs = {}; // 清空搜索数据
        dispatch("search", { filters: {} }); // 重新搜索（清空过滤条件）
    };
</script>

<div class="search-container bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText p-6 rounded-lg shadow-lg space-y-6">
    <!-- 搜索字段 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each searchParams as param}
            <div class="flex flex-col space-y-1">
                <label for={param.key} class="text-sm font-medium text-lightText dark:text-darkText">
                    {param.label}:
                </label>
                <input
                        id={param.key}
                        type="text"
                        bind:value={searchInputs[param.key]}
                        placeholder={`请输入${param.label}`}
                        class="border border-borderLight dark:border-borderDark rounded-md p-2 w-full bg-cardLight dark:bg-cardDark text-lightText dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition"
                />
            </div>
        {/each}
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-end space-x-4">
        <button
                on:click={handleSearch}
                class="bg-primary hover:bg-blue-600 text-accent px-4 py-2 rounded-md transition shadow-sm"
        >
            搜索
        </button>
        <button
                on:click={handleReset}
                class="bg-neutral dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-lightText dark:text-darkText px-4 py-2 rounded-md transition shadow-sm"
        >
            重置
        </button>
    </div>
</div>


<style>
    .search-container {
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    input:focus {
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    @media (prefers-color-scheme: dark) {
        .search-container {
            color: var(--dark-text);
        }
    }
</style>
