<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let username = "Vben";
    export let email = "ann.vben@gmail.com";
    export let avatar = "/favicon.png";
    export let status = "Pro";
    let isDarkMode = false; // 主题状态，默认亮色

    // 切换主题函数
    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    };


    // 页面加载时，检查本地存储的主题
    onMount(() => {
        const savedTheme = localStorage.getItem("theme");
        isDarkMode = savedTheme === "dark";
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });


    let searchInput = "";
    let showDropdown = false;

    // 仅在浏览器端添加点击事件监听器
    onMount(() => {
        if (browser) {
            const handleClickOutside = (event) => {
                if (!event.target.closest(".dropdown-container")) {
                    showDropdown = false;
                }
            };

            document.addEventListener("click", handleClickOutside);

            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    });
</script>

<div class="flex items-center space-x-4 relative">
    <!-- 主题切换按钮 -->
    <button
            class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700
               text-gray-800 dark:text-gray-200 hover:bg-gray-300
               dark:hover:bg-gray-600 transition duration-300"
            on:click={toggleTheme}
    >
        {#if isDarkMode}
            🌞 <!-- 亮色主题图标 -->
        {:else}
            🌙 <!-- 暗色主题图标 -->
        {/if}
    </button>

    <!-- 站内搜索框 -->
    <div class="relative w-64">
        <input
                type="text"
                placeholder="搜索..."
                bind:value={searchInput}
                class="input input-sm rounded-lg pl-4 pr-10 w-full
                   border border-gray-300 dark:border-gray-600
                   bg-lightBackground dark:bg-darkBackground
                   text-lightText dark:text-darkText
                   focus:ring-2 focus:ring-primary dark:focus:ring-accent
                   focus:outline-none transition duration-300"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 dark:text-gray-300">🔍</span>
    </div>

    <!-- 用户头像按钮 -->
    <div class="relative">
        <button
                class="flex items-center focus:outline-none"
                on:click|stopPropagation={() => (showDropdown = !showDropdown)}
        >
            <div class="relative">
                <img
                        src="{avatar}"
                        alt="Avatar"
                        class="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                {#if status}
                    <span
                            class="absolute -bottom-1 -right-1 bg-green-500
                               text-xs text-white px-1 rounded-full shadow-md"
                    >
                        {status}
                    </span>
                {/if}
            </div>
        </button>

        <!-- 下拉菜单 -->
        {#if showDropdown}
            <div
                    class="absolute right-0 mt-2 w-60 bg-lightBackground
                       dark:bg-darkBackground text-lightText
                       dark:text-darkText rounded-lg shadow-lg
                       z-50 border border-gray-300 dark:border-gray-700
                       transition duration-300"
            >
                <div class="p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
                    <img src="{avatar}" alt="Avatar" class="w-10 h-10 rounded-full" />
                    <div class="ml-3">
                        <div class="font-bold text-gray-900 dark:text-white">{username}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{email}</div>
                    </div>
                </div>
                <ul class="space-y-1">
                    <li>
                        <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
                                   flex items-center space-x-2 transition duration-200"
                        >
                            <span>📄</span>
                            <span>文档</span>
                        </a>
                    </li>
                    <li>
                        <a
                                href="https://github.com"
                                target="_blank"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
                                   flex items-center space-x-2 transition duration-200"
                        >
                            <span>🐙</span>
                            <span>GitHub</span>
                        </a>
                    </li>
                    <li>
                        <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
                                   flex items-center space-x-2 transition duration-200"
                        >
                            <span>❓</span>
                            <span>问题 & 帮助</span>
                        </a>
                    </li>
                </ul>
                <div class="border-t border-gray-200 dark:border-gray-700">
                    <button
                            class="block w-full text-left px-4 py-2 text-danger
                               hover:bg-gray-100 dark:hover:bg-gray-700
                               hover:text-red-400 transition duration-200"
                    >
                        退出登录
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>


