import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;
	const pathname = url.pathname;

	// 输出请求的路径
	console.log('Checking path:', pathname);

	// 放行静态文件、API 和登录页面（包括任何以 /login 开头的路径）
	if (
		pathname.startsWith('/api') ||
		pathname.startsWith('/login') ||
		pathname.startsWith('/static')
	) {
		console.log('Path is allowed without authentication:', pathname);
		return await resolve(event);
	}

	// 获取 auth_token 和 alternate_token
	const authToken = cookies.get('auth_token');
	const alternateToken = cookies.get('alternate_token'); // 注意这里是 alternate_token，而不是 auth_token

	// 输出 token 的调试信息
	console.log('auth_token:', authToken);
	console.log('alternate_token:', alternateToken);

	// 如果 auth_token 或 alternate_token 存在其中之一即可放行
	if (authToken || alternateToken) {
		console.log('Authenticated with at least one token');
		return await resolve(event);
	}

	// 如果没有 token，重定向到登录页面
	console.log('No valid token found, redirecting to login');
	throw redirect(302, '/login');
};
