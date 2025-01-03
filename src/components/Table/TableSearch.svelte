<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let searchFields = [];
    export let filterFields = [];

    let searchQuery = '';
    let filters = {};

    const dispatch = createEventDispatcher();

    const handleSearch = () => {
        // 触发搜索事件
        dispatch('search', { query: searchQuery });
    };

    const handleFilterChange = (field, value) => {
        // 更新筛选器的值
        filters[field] = value;
        dispatch('filter', { filters });
    };
</script>

<div class="flex justify-between items-center mb-4">
    <!-- 搜索框 -->
    <div class="flex items-center space-x-4">
        <input
                type="text"
                placeholder="搜索..."
                bind:value={searchQuery}
                class="border rounded-lg px-4 py-2 w-64 bg-lightBackground dark:bg-darkBackground
                   text-lightText dark:text-darkText focus:ring-2 focus:ring-primary
                   dark:focus:ring-accent focus:outline-none transition duration-300"
                on:input={handleSearch}
        />
    </div>

    <!-- 筛选器 -->
    <div class="flex items-center space-x-4">
        {#each filterFields as field}
            <select
                    class="border rounded-lg px-3 py-2 bg-lightBackground dark:bg-darkBackground
                       text-lightText dark:text-darkText focus:ring-2 focus:ring-primary
                       dark:focus:ring-accent focus:outline-none transition duration-300"
                    bind:value={filters[field.label]}
                    on:change={(e) => handleFilterChange(field.label, e.target.value)}
            >
                <option value="">{field.label}</option>
                {#each field.options as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        {/each}
    </div>
</div>
