<script>
    export let breadcrumbs = ["Home", "Dashboard"]; // 面包屑数据通过 props 传入
</script>

<nav class="px-4 py-2 bg-lightBackground dark:bg-darkBackground transition duration-300">
    <ol class="flex space-x-2 text-sm">
        {#each breadcrumbs as crumb, index}
            <li class="flex items-center">
                <!-- 面包屑链接颜色 -->
                <a
                        href="#"
                        class="hover:underline text-secondary dark:text-grayDark
                       hover:text-primary dark:hover:text-accent
                       transition duration-300 font-medium"
                        class:font-semibold={index === breadcrumbs.length - 1}
                >
                {crumb}
                </a>
                <!-- 分隔符颜色 -->
                {#if index < breadcrumbs.length - 1}
                    <span
                            class="mx-1 text-gray-400 dark:text-gray-500 transition duration-300"
                    >
                        /
                    </span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>

