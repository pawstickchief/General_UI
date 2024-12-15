<script lang="ts">
    import { theme } from '../stores/auth';
    import { onMount } from 'svelte';

    // 设置初始主题
    onMount(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        theme.set(currentTheme as 'light' | 'dark');
    });

    // 切换主题
    const toggleTheme = () => {
        theme.update((current) => {
            const newTheme = current === 'light' ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };
</script>

<button on:click={toggleTheme} class="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300">
    <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-800 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
    >
        {#if $theme === 'light'}
            <!-- 太阳图标 -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m0 16v2m8-8h2m-18 0H2m16.364-6.364l1.414 1.414M4.222 19.778l1.414-1.414m12.728 0l1.414 1.414M4.222 4.222l1.414 1.414M12 6a6 6 0 110 12 6 6 0 010-12z" />
        {:else}
            <!-- 月亮图标 -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3.3a9 9 0 100 17.4A7.5 7.5 0 1112 3.3z" />
        {/if}
    </svg>
</button>
