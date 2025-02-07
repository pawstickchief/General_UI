import { json, type RequestEvent } from '@sveltejs/kit';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import https from 'https';

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 获取 Token
        const token = request.headers.get('Authorization');
        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 获取请求体中的用户信息
        const { id, username, email, role, password } = await request.json();
        if (!id || !username || !email || !role) {
            return json({ message: 'Bad Request: Missing required fields' }, { status: 400 });
        }

        // 创建跳过 SSL 验证的 HTTPS 代理
        const agent = new https.Agent({
            rejectUnauthorized: false // 跳过 SSL 验证
        });

        // 发送 POST 请求到后端 `/users/update`
        const response = await fetch('https://dev.pawstickchief.com:8007/users/update', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, username, email, role, password }),
            agent
        });

        // 检查是否成功
        if (!response.ok) {
            const errorData = await response.json();
            return json({ message: 'Failed to update user', details: errorData }, { status: response.status });
        }

        return json({ message: `User ${username} updated successfully` }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
};
