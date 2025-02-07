import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;
	const pathname = url.pathname;

	console.log('🔍 Checking path:', pathname);

	// **放行不需要鉴权的路径**
	if (
		pathname.startsWith('/api') ||
		pathname.startsWith('/login') ||
		pathname.startsWith('/static')
	) {
		console.log('✅ Path is allowed without authentication:', pathname);
		return resolve(event);
	}

	// **获取 Token 和 Token 过期时间**
	const authToken = cookies.get('auth_token');
	const tokenExpiration = cookies.get('token_expiration');

	console.log('🔑 auth_token:', authToken ? '存在' : '不存在');
	console.log('⏳ token_expiration:', tokenExpiration || '不存在');

	// **检查 Token 是否过期**
	if (tokenExpiration) {
		const expirationTime = parseInt(tokenExpiration);
		if (Date.now() > expirationTime) {
			console.log("🚨 Token 已过期，自动退出");

			// **清除 Token**
			cookies.set('auth_token', '', { path: '/', maxAge: 0 });
			cookies.set('token_expiration', '', { path: '/', maxAge: 0 });

			throw redirect(302, '/login'); // ✅ 过期后重定向
		}
	}

	// **如果没有 Token，重定向到登录页面**
	if (!authToken) {
		console.log('❌ No valid token found, redirecting to login');
		throw redirect(302, '/login');
	}

	// **Token 有效，继续请求**
	return resolve(event);
};
