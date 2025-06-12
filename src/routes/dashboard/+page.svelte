<script lang="ts">
    import Layout from "../../layouts/Layout.svelte";
    import { onMount } from 'svelte';

    let stats = {
        totalUsers: 0,
        onlineUsers: 0,
        visitsToday: 0,
        lastLogin: '-'
    };

    const getCookie = (name: string): string | null => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const token = getCookie('auth_token');

    onMount(async () => {
        try {
            const res = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token || ''
                }
            });

            if (!res.ok) throw new Error('Failed to fetch dashboard stats');
            const data = await res.json();
            stats = data;
        } catch (err) {
            console.error('Dashboard error:', err);
        }
    });
</script>

<Layout>
    <div class="p-4 space-y-6">
        <h1 class="text-2xl font-bold text-lightText dark:text-darkText">欢迎回来 👋</h1>
        <p class="text-gray-500 dark:text-gray-400">以下是平台的基础数据统计</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow">
                <h3 class="text-sm font-medium text-secondary dark:text-gray-400">总用户数</h3>
                <p class="text-2xl font-bold text-lightText dark:text-darkText">{stats.totalUsers}</p>
            </div>
            <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow">
                <h3 class="text-sm font-medium text-secondary dark:text-gray-400">在线用户</h3>
                <p class="text-2xl font-bold text-lightText dark:text-darkText">{stats.onlineUsers}</p>
            </div>
            <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow">
                <h3 class="text-sm font-medium text-secondary dark:text-gray-400">今日访问</h3>
                <p class="text-2xl font-bold text-lightText dark:text-darkText">{stats.visitsToday}</p>
            </div>
            <div class="bg-cardLight dark:bg-cardDark p-4 rounded-xl shadow">
                <h3 class="text-sm font-medium text-secondary dark:text-gray-400">上次登录</h3>
                <p class="text-2xl font-bold text-lightText dark:text-darkText">{stats.lastLogin}</p>
            </div>
        </div>
    </div>
</Layout>
