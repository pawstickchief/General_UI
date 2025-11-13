import { json, type RequestEvent } from '@sveltejs/kit';
import https from 'https';
import fetch from 'node-fetch';
import type { LoginRequest, LoginResponse, BackendResponse } from '../../../types';

const isBackendResponse = (value: unknown): value is BackendResponse => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const record = value as Record<string, unknown>;
    if (typeof record.code !== 'number' || typeof record.msg !== 'string') {
        return false;
    }

    if (record.data !== undefined) {
        if (typeof record.data !== 'object' || record.data === null) {
            return false;
        }

        const dataRecord = record.data as Record<string, unknown>;
        if ('token' in dataRecord && typeof dataRecord.token !== 'string') {
            return false;
        }
        if ('expiresIn' in dataRecord && typeof dataRecord.expiresIn !== 'number') {
            return false;
        }
    }

    return true;
};

export const POST = async ({ request }: RequestEvent) => {
    try {
        const { username, password, rememberMe }: LoginRequest = await request.json();

        console.log('📢 接收到登录请求:', { username, rememberMe });

        // 创建 HTTPS Agent 忽略 SSL 验证
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false, // 忽略 SSL 验证
        });

        // **请求真实后端**
        const response = await fetch('https://dev.pawstickchief.com:8007/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', // ✅ 确保服务器返回 JSON
            },
            body: JSON.stringify({ username, password, rememberMe }), // ✅ 传递 rememberMe
            agent: httpsAgent,
        });

        // 解析后端返回的 JSON
        const rawResult = await response.json();

        if (!isBackendResponse(rawResult)) {
            console.error('⚠️ 后端返回了无法识别的结构:', rawResult);
            return json(
                {
                    message: 'Invalid response from authentication server',
                    success: false,
                } as LoginResponse,
                { status: 502 }
            );
        }

        const result = rawResult;

        // **后端响应成功**
        if (response.ok && result.code === 1000 && result.data?.token) {
            const token = result.data.token;
            const expiresIn = result.data.expiresIn ?? (rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60); // 后端未返回时，前端默认

            console.log(`⏳ Token 过期时间 (秒): ${expiresIn}，大约 ${expiresIn / 3600} 小时`);

            return json(
                {
                    token,
                    expiresIn, // ✅ 传递给前端
                    message: result.msg || 'Login successful',
                    success: true,
                } as LoginResponse,
                { status: 200 }
            );
        }

        // **后端返回错误**
        console.error('❌ 登录失败:', result?.msg || 'Invalid credentials');

        return json(
            {
                message: result?.msg || 'Invalid credentials',
                success: false,
            } as LoginResponse,
            { status: 401 }
        );

    } catch (error) {
        console.error('🚨 登录接口错误:', error);

        return json(
            {
                message: 'Internal server error',
                success: false,
            } as LoginResponse,
            { status: 500 }
        );
    }
};

