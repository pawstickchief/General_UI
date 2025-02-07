import { json, type RequestEvent } from '@sveltejs/kit';
import https from 'https'; // 引入类型
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 从请求头中获取 Authorization Token
        const token = request.headers.get('Authorization');

        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 解析请求体，获取分页参数和搜索参数
        const body = await request.json();
        const { page, limit, filters } = body;  // 这里确保 filters 被正确解析

        if (!page || !limit) {
            return json({ message: 'Bad Request: Missing page or limit parameters' }, { status: 400 });
        }


        // 创建跳过 SSL 验证的 HTTPS 代理
        const agent = new https.Agent({
            rejectUnauthorized: false // 跳过 SSL 验证
        });

        // 向外部接口发送 POST 请求获取用户数据
        const response = await fetch('https://dev.pawstickchief.com:8007/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page, limit, filters }),
            agent
        });

        // 检查请求是否成功
        if (!response.ok) {
            const errorData = await response.json();
            return json({ message: 'Failed to fetch users', details: errorData }, { status: response.status });
        }

        // 解析用户数据
        const userData = await response.json();


        // 返回用户数据
        return json(userData, { status: 200 });
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        return json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
};
