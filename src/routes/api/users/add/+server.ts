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

export const UserCreateSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(50),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: PasswordSchema,
    role: UserRoleEnum
});

export type UserCreatePayload = z.infer<typeof UserCreateSchema>;

export const POST = async ({ request }: RequestEvent) => {
    try {
        // 获取 Token
        const token = request.headers.get('Authorization');
        if (!token) {
            return json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        // 验证请求体中的用户信息
        const { username, email, password, role } = UserCreateSchema.parse(await request.json());

        // 创建跳过 SSL 验证的 HTTPS 代理
        const agent = new https.Agent({
            rejectUnauthorized: false // 跳过 SSL 验证
        });
        // 调用外部 API 进行用户添加
        const response = await fetch('https://dev.pawstickchief.com:8007/users/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, role }),
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
        console.error('Error adding user:', error);
        return json({ message: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
};
