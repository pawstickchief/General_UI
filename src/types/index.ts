

// 菜单项类型定义
export interface MenuItem {
    id: number;
    title: string;
    icon?: string;
    pathname: string;
    type: 'item' | 'divider';
    position: number;
    parent_id: number | null;
    children?: MenuItem[];
}
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at: string;
}

// 面包屑项类型定义
export interface BreadcrumbItem {
    title: string;
    pathname: string;
}

// 标签页类型定义
export interface TabItem {
    title: string;
    pathname: string;
}
export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
    message: string;
    success: boolean;
}
export interface BackendResponse {
    code: number;
    msg: string;
    data?: {
        token: string;
        expiresIn?: number;
    };
}

export type { UserCreatePayload } from '../routes/api/users/add/+server';
export type { UserUpdatePayload } from '../routes/api/users/update/+server';
export type { UserApiResponse } from '../routes/api/users/schema';
