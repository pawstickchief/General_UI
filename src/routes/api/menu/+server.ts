import { json, type RequestEvent } from '@sveltejs/kit';
import type { MenuItem } from '../../../types';
import https from "https"; // 引入类型
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const buildMenuTree = (items: MenuItem[], parentId: number | null = null): MenuItem[] => {
    return items
        .filter((item) => item.parent_id === parentId)
        .map((item) => ({
            ...item,
            children: buildMenuTree(items, item.id),
        }));
};

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 从请求头中获取 Authorization Token
        const token = request.headers.get('Authorization');

        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 创建跳过 SSL 验证的 HTTPS 代理
        const agent = new https.Agent({
            rejectUnauthorized: false // 跳过 SSL 验证
        });

        // 向外部接口发送请求获取菜单数据
        const response = await fetch('https://dev.pawstickchief.com:8007/menus', {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            agent // 设置自定义 HTTPS Agent
        });

        // 检查请求是否成功
        if (!response.ok) {
            const errorData = await response.json();
            return json({ message: 'Failed to fetch menu', details: errorData }, { status: response.status });
        }

        // 解析菜单数据
        const menuData = await response.json();
        const menuTree = buildMenuTree(menuData.menus);
        return json(menuTree, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu:', error);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
