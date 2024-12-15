<!-- src/layouts/Layout.svelte -->
<script>
    import Header from '../components/Header.svelte';
    import Sidebar from '../components/Sidebar.svelte';
    import MainContent from '../components/MainContent.svelte';
    let showScrollTop = false;

    // 监听滚动事件，动态显示按钮
    window.addEventListener('scroll', () => {
        showScrollTop = window.scrollY > 300; // 滚动超过300px时显示
    });

    // 返回顶部的函数
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
</script>

<!-- 父容器布局 -->
<div
        class="flex min-h-screen w-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText transition-all duration-300 overflow-hidden"
>
    <!-- 左侧菜单栏 -->
    <Sidebar class="border-r border-borderLight dark:border-borderDark" />

    <!-- 右侧内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 顶部头部 -->
        <Header class="border-b border-borderLight dark:border-borderDark" />

        <!-- 主体内容 -->
        <main class="flex-1 overflow-auto p-4">
            <MainContent />
        </main>

        <!-- 返回顶部按钮 -->
        {#if showScrollTop}
            <button
                    on:click={scrollToTop}
                    class="fixed bottom-10 right-10 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-300"
            >
                ⬆️ Top
            </button>
        {/if}
    </div>
</div>

<style>
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6b7280; /* secondary 色调 */
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e2e8f0; /* borderLight 配色 */
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #4b5563; /* darker 滑块色调 */
    }
</style>
