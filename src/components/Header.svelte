<!-- src/components/Header.svelte -->
<script lang="ts">
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import UserModule from "./UserModule.svelte";
    export let breadcrumbs: string[] = [];
    export let notifications: number = 0;
</script>

<header
        class=" flex flex-col space-y-2
       bg-lightBackground dark:bg-darkBackground
       text-lightText dark:text-darkText
       border border-borderLight dark:border-borderDark
       rounded-md shadow-lg
       transition-all duration-300 ease-in-out"
>
    <!-- 顶部部分 -->
    <div class="flex h-16 border border-borderLight dark:border-borderDark justify-between items-center gap-4">
        <!-- 左侧：面包屑导航 -->
        <Breadcrumbs {breadcrumbs} />

        <!-- 右侧：用户模块 -->
        <UserModule {notifications} />
    </div>

    <!-- 底部部分：菜单标签页 -->
</header>


