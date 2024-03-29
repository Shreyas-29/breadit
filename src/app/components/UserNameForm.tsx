'use client';

import { toast } from '@/hooks/use-toast';
import { UsernameRequest, UsernameValidator } from '@/lib/validators/username';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';


interface UserNameFormProps {
    user: Pick<User, 'id' | 'username'>;
}

const UserNameForm: FC<UserNameFormProps> = ({
    user
}) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<UsernameRequest>({
        resolver: zodResolver(UsernameValidator),
        defaultValues: {
            name: user?.username || '',
        }
    });

    const { mutate: updateUsername, isLoading } = useMutation({
        mutationFn: async ({ name }: UsernameRequest) => {
            const payload: UsernameRequest = {
                name
            }

            const { data } = await axios.patch('/api/username', payload);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    return toast({
                        title: 'Username already taken.',
                        description: 'Please choose a different username.',
                        variant: 'destructive'
                    })
                }
            }

            toast({
                title: 'An error occurred',
                description: 'Could not change username.',
                variant: 'destructive'
            })
        },
        onSuccess: () => {
            toast({
                description: 'Your username has been updated.',
            });
            router.refresh();
        }
    });


    return (
        <form

            onSubmit={handleSubmit((e) => updateUsername(e))}>
            <Card className='mt-8'>
                <CardHeader>
                    <CardTitle>
                        Your username
                    </CardTitle>
                    <CardDescription>
                        Please enter a display name you are comfortable with.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className='relative grid gap-1'>
                        <div className='absolute top-0 left-0 w-8 h-10 grid place-items-center'>
                            <span className='text-sm text-zinc-400'>
                                u/
                            </span>
                        </div>

                        <Label className='sr-only' htmlFor='name'>
                            Name
                        </Label>
                        <Input
                            id='name'
                            className='w-[400px] pl-6'
                            size={32}
                            {...register('name')}
                        />
                        {errors?.name && (
                            <p className='text-sm text-red-500'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button isLoading={isLoading}>
                        Change name
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default UserNameForm
