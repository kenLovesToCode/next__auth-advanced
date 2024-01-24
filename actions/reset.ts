'use server';

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    //server side validation in-case they bypass the frontend side validation
    if (!validatedFields.success) {
        return { erro: 'Invalid email!' };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'Email not found!' };
    }

    //TODO: reset token and send email

    return { success: 'Reset email sent!' };
};
