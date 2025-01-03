<script lang="ts">
    import Sidebar from '../components/Sidebar.svelte';
    import Header from '../components/Header.svelte';

    // 面包屑和标签页由子组件传递
    let breadcrumbs: string[] = [];
    let tabs = [];
    let activeTab: number = 0;
    let notifications: number = 3;

    // 监听 Sidebar 的事件，更新面包屑和标签页
    const updateBreadcrumbsAndTabs = (event: CustomEvent) => {
        const { breadcrumbs: newBreadcrumbs, tabs: newTabs } = event.detail;

        // 合并状态
        breadcrumbs = newBreadcrumbs;
        tabs = newTabs;
    };
</script>

<div class="flex min-h-screen w-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText transition-all duration-300 overflow-hidden">
    <!-- 左侧菜单栏 -->
    <Sidebar class="border-r border-borderLight dark:border-borderDark" on:updateBreadcrumbsAndTabs={updateBreadcrumbsAndTabs} />

    <!-- 右侧内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 顶部头部 -->
        <Header {breadcrumbs} {tabs} bind:activeTab {notifications} />

        <!-- 主体内容 -->
        <main class="flex-1 overflow-auto p-4">
            <slot></slot>
        </main>
    </div>
</div>
