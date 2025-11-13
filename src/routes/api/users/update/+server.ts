import { json, type RequestEvent } from '@sveltejs/kit';
import https from 'https';
import { z, ZodError } from 'zod';
import { UserApiResponseSchema } from '../schema';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UserRoleEnum = z.enum(['user', 'admin']);
const PasswordSchema = z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' });

export const UserUpdateSchema = z.object({
    id: z.number({ required_error: 'Missing user id' }).int().positive(),
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(50),
    email: z.string().email({ message: 'Invalid email address.' }),
    role: UserRoleEnum,
    password: PasswordSchema.optional()
});

export type UserUpdatePayload = z.infer<typeof UserUpdateSchema>;

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 获取 Token
        const token = request.headers.get('Authorization');
        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 验证请求体中的用户信息
        const { id, username, email, role, password } = UserUpdateSchema.parse(await request.json());

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
            const errorData = UserApiResponseSchema.parse(await response.json());
            return json(errorData, { status: response.status });
        }

        const responseData = UserApiResponseSchema.parse(await response.json());
        return json(responseData, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return json({ message: 'Bad Request: Invalid payload', details: error.flatten() }, { status: 400 });
        }
        console.error('Error updating user:', error);
        return json({ message: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
};
