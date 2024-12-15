<script lang="ts">
    import LoginForm from '../../components/LoginForm.svelte';
    import ThemeToggle from '../../components/ThemeToggle.svelte';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300 relative">
    <!-- 左上角图标和标题 -->
    <div class="absolute top-6 left-6 flex items-center space-x-2">
        <img src="/favicon.png" alt="Logo" class="w-8 h-8" /> <!-- 图标，替换为你的图标路径 -->
        <span class="text-2xl font-bold text-primary dark:text-accent">干饭咪</span> <!-- 标题 -->
    </div>

    <!-- 主体内容 -->
    <div class="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-6 space-y-6 md:space-y-0">
        <!-- 欢迎语 -->
        <div class="flex-1 text-center md:text-left space-y-4">
            <h1 class="text-4xl font-bold">欢迎回来 👋</h1>
            <p class="text-gray-600 dark:text-gray-400">请输入您的账户信息以开始管理您的项目</p>
        </div>

        <!-- 登录表单 -->
        <div class="flex-1">
            <LoginForm />
            <!-- 主题切换按钮 -->
            <div class="flex justify-center mt-4">
                <ThemeToggle />
            </div>
        </div>
    </div>
</div>

