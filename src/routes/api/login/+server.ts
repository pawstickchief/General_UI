import { json, type RequestEvent } from '@sveltejs/kit';
import https from 'https';
import fetch from 'node-fetch';
import type { LoginRequest, LoginResponse, BackendResponse } from '../../../types';

export const POST = async ({ request }: RequestEvent) => {
    try {
        const { username, password }: LoginRequest = await request.json();

        console.log('Received login request:', { username, password });

        // 创建 HTTPS Agent 忽略 SSL 验证
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false, // 忽略 SSL 验证
        });

        const response = await fetch('https://127.0.0.1:8443/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            agent: httpsAgent,
        });

        console.log('HTTP response status:', response.status);
        const result: BackendResponse = await response.json() as BackendResponse;

        // 打印结果，调试数据
        console.log('Login response data:', result);

        if (response.ok && result.code === 1000) {
            console.log('Login successful:', result.data?.token);

            return json({
                token: result.data?.token || '',
                message: result.msg || 'Login successful',
                success: true,
            } as LoginResponse, { status: 200 });
        } else {
            console.log('Login failed:', result.msg || 'Invalid credentials');

            return json(
                {
                    message: result.msg || 'Invalid credentials',
                    success: false,
                } as LoginResponse,
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);

        return json(
            {
                message: 'Internal server error',
                success: false,
            } as LoginResponse,
            { status: 500 }
        );
    }
};
