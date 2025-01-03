<script lang="ts">
    import { authToken } from '../stores/auth';
    import type { LoginRequest, LoginResponse } from '../types';
    import { goto } from '$app/navigation';

    let username = '';
    let password = '';
    let rememberMe = false;
    let errorMessage = '';

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, rememberMe } as LoginRequest),
            });

            const result: LoginResponse = await response.json();

            if (result.success) {
                const expirationTime = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60; // 7 天或 1 天
                storeToken(result.token, expirationTime);

                // 重定向到 dashboard
                await goto('/dashboard');
            } else {
                errorMessage = result.message;
            }
        } catch (error) {
            errorMessage = '登录失败，请稍后再试';
        }
    };

    // 封装存储 Token 的逻辑
    const storeToken = (token: string, maxAge: number) => {
        // 设置到 authToken store
        authToken.set(token);

        // 存储到 cookie
        document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}`;

        // 存储到 localStorage
        localStorage.setItem('auth_token', token);
    };
</script>


<div class="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-sm mx-auto">
    <!-- 标题 -->
    <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">登录</h2>

    <!-- 用户名输入框 -->
    <input
            type="text"
            placeholder="用户名"
            bind:value={username}
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
    />

    <!-- 密码输入框 -->
    <input
            type="password"
            placeholder="密码"
            bind:value={password}
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
    />

    <!-- 记住我 和 忘记密码 -->
    <div class="flex items-center justify-between text-sm">
        <label class="flex items-center space-x-2">
            <input type="checkbox" bind:checked={rememberMe} class="form-checkbox text-primary" />
            <span class="text-gray-600 dark:text-gray-300">记住登录 7 天</span>
        </label>
        <a href="/forgot-password" class="text-primary hover:underline dark:text-blue-400">忘记密码?</a>
    </div>

    <!-- 错误消息提示 -->
    {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
    {/if}

    <!-- 登录按钮 -->
    <button on:click={handleLogin} class="w-full p-3 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-300">
        登录
    </button>

    <!-- 隐私协议 -->
    <p class="text-xs text-center text-gray-500 dark:text-gray-400">
        登录即表示您同意我们的
        <a href="/privacy-policy" class="text-primary hover:underline dark:text-blue-400">隐私政策</a>
        和
        <a href="/terms" class="text-primary hover:underline dark:text-blue-400">服务条款</a>。
    </p>
</div>
