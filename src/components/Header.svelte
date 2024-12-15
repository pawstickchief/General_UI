<!-- src/components/Header.svelte -->
<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import UserModule from "./UserModule.svelte";
    import Tabs from "./Tabs.svelte";

    // 标签页数据示例
    let tabs = [
        { title: "分析页" },
        { title: "工作台" },
        { title: "关于" },
    ];
    const breadcrumbs = ["Home", "Dashboard"]; // 面包屑数据
    let activeTab = 0;
    const notifications = 3; // 未读消息数量
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
    <Tabs {tabs} bind:activeTab />
</header>


