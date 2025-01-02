import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

		kit: {
			adapter: adapter({
				// 自定义静态文件的输出目录
				pages: 'dist', // 静态页面输出到 dist 目录
				assets: 'dist/assets', // 静态资源输出到 dist/assets 目录
			}),

			// 自定义构建输出目录
			outDir: 'dist', // 构建后的文件输出到 dist 目录

			// 配置静态资源的目录
			files: {
				assets: 'static',  // 默认静态文件目录是 `static`，可以自定义路径
			},
		}
};

export default config;


