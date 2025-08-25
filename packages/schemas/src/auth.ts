import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(8, { message: '8文字以上入力してください。' }),
});

export type Auth = z.infer<typeof AuthSchema>;