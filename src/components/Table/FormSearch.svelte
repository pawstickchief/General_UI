<script lang="ts">
    export let searchParams = []; // 搜索参数（父组件传递）

    let searchInputs = {}; // 搜索输入的值

    const handleSearch = () => {
        // 触发搜索逻辑
    };

    const handleReset = () => {
        searchInputs = {};
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
