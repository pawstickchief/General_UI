import { json, type RequestEvent } from '@sveltejs/kit';
import https from 'https';

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 获取 Token
        const token = request.headers.get('Authorization');
        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 获取请求体中的用户 ID
        const { id } = await request.json();
        if (!id) {
            return json({ message: 'Bad Request: Missing user ID' }, { status: 400 });
        }

        // 创建跳过 SSL 验证的 HTTPS 代理
        const agent = new https.Agent({
            rejectUnauthorized: false // 跳过 SSL 验证
        });

        // 调用外部 API 进行删除
        const response = await fetch('https://dev.pawstickchief.com:8007/users/delete', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
            agent
        });

        // 检查是否成功
        if (!response.ok) {
            const errorData = await response.json();
            return json({ message: 'Failed to delete user', details: errorData }, { status: response.status });
        }

        return json({ message: `User ID ${id} deleted successfully` }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
};
