'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react'
import { AiFillApple, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues,SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/userRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success("You have logged in successfully, my lord.")
                    router.refresh()
                    loginModal.onClose()
                } else if (callback?.error) {
                    toast.error(callback.error)
                }
            })
    }

    function handleNoAccount() {
        registerModal.onOpen()
        loginModal.onClose()
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back to HeirBnB!' subtitle='Login to your account, my lord.' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            {/* <Button outline label="Login with Apple" icon={AiFillApple} onClick={() => {}} /> */}
            <Button outline label="Login with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label="Login with GitHub" icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>Don&#39;t have an account?</div>
                    <div onClick={handleNoAccount} className='text-neutral-800 cursor-pointer hover:underline'>Login</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login" 
            actionLabel="Continue" 
            onClose={loginModal.onClose} 
            onSubmit={handleSubmit(onSubmit)} 
            body={bodyContent} 
            footer={footerContent} />
    )
}

export default LoginModal