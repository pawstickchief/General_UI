<script lang="ts">
    import Sidebar from '../components/Sidebar.svelte';
    import Header from '../components/Header.svelte';

    // 用来接收子组件传递的面包屑和标签数据
    let breadcrumbs: string[] = ['主页', '仪表盘'];
    let tabs = [{ title: '仪表盘' }];
    let activeTab: number = 0;
    let notifications: number = 3;

    // 处理从子组件传递的数据更新面包屑和标签页
    const updateBreadcrumbsAndTabs = (event: CustomEvent) => {
        breadcrumbs = event.detail.breadcrumbs;
        tabs = event.detail.tabs;
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
            <!-- 这里是主内容 -->
            <slot></slot>
        </main>
    </div>
</div>
