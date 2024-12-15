<!-- src/components/Sidebar.svelte -->
<script>
    // 如果需要， 可以在这里添加菜单的动态功能或脚本
</script>

<aside class="w-52 h-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText
           border-r border-borderLight dark:border-borderDark transition duration-300"
>
    <!-- 标题区域 -->
    <div class="p-4 text-2xl font-bold text-primary dark:text-accent">Admin Panel</div>

    <!-- 菜单项 -->
    <ul class="p-4 space-y-2">
        <li>
            <a
                    href="#"
                    class="block px-4 py-2 rounded-md
                       hover:bg-primary hover:text-lightBackground
                       dark:hover:bg-accent dark:hover:text-darkBackground
                       transition duration-300"
            >
                Dashboard
            </a>
        </li>
        <li>
            <a
                    href="#"
                    class="block px-4 py-2 rounded-md
                       hover:bg-primary hover:text-lightBackground
                       dark:hover:bg-accent dark:hover:text-darkBackground
                       transition duration-300"
            >
                Users
            </a>
        </li>
        <li>
            <a
                    href="#"
                    class="block px-4 py-2 rounded-md
                       hover:bg-primary hover:text-lightBackground
                       dark:hover:bg-accent dark:hover:text-darkBackground
                       transition duration-300"
            >
                Settings
            </a>
        </li>
        <li>
            <a
                    href="#"
                    class="block px-4 py-2 rounded-md
                       hover:bg-primary hover:text-lightBackground
                       dark:hover:bg-accent dark:hover:text-darkBackground
                       transition duration-300"
            >
                Reports
            </a>
        </li>
        <li>
            <a
                    href="#"
                    class="block px-4 py-2 rounded-md text-danger
                       hover:bg-red-500 hover:text-lightBackground
                       dark:hover:bg-red-600 dark:hover:text-darkBackground
                       transition duration-300"
            >
                Log Out
            </a>
        </li>
    </ul>
</aside>


<style>
    aside {
        max-height: 100vh; /* 限制高度 */
        overflow-y: auto; /* 垂直滚动 */
        scrollbar-width: thin; /* Firefox */
    }
</style>
