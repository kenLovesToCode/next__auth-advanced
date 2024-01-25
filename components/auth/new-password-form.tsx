'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/form-success';
import { newPassword } from '@/actions/new-password';
import { NewPasswordSchema } from '@/schemas';
import { FormError } from '../form-error';
import { useSearchParams } from 'next/navigation';

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
