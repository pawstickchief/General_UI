<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // 导出为 CSV 的逻辑
    const handleExport = () => {
        dispatch('export');
    };

    // 打印表格逻辑
    const handlePrint = () => {
        dispatch('print');
    };

    // 删除选中项逻辑
    const handleDeleteSelected = () => {
        dispatch('deleteSelected');
    };
</script>

<div class="flex items-center space-x-4">
    <button class="btn btn-sm text-blue-500" on:click={handleExport}>导出</button>
    <button class="btn btn-sm text-gray-500" on:click={handlePrint}>打印</button>
    <button class="btn btn-sm text-red-500" on:click={handleDeleteSelected}>删除选中</button>
</div>
