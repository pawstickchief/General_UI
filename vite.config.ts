import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 8082, // 指定监听端口
        host: true  // 可选：设置为 `true` 使服务器对局域网可用
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
