import { json, type RequestEvent } from '@sveltejs/kit';
import type { MenuItem } from '../../../types'; // 引入类型

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
        const token = request.headers.get('Authorization');

        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        const menuData: MenuItem[] = [
            { id: 1, title: '仪表盘', icon: '📊', pathname: '/dashboard', type: 'item', position: 1, parent_id: null },
            { id: 2, title: '用户管理', icon: '👥', pathname: '/users', type: 'item', position: 2, parent_id: null },
            { id: 3, title: '系统设置', icon: '⚙️', pathname: '/settings', type: 'item', position: 3, parent_id: null },
            { id: 4, title: '权限控制', icon: '📈', pathname: '/purview', type: 'item', position: 4, parent_id: null },
            { id: 5, title: '用户列表', icon: '👥', pathname: '/users/details', type: 'item', position: 5, parent_id: 2 },
        ];

        const menuTree = buildMenuTree(menuData);
        return json(menuTree, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu:', error);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
