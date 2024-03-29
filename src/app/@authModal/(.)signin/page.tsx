import { CloseModal, SignIn } from '@/app/components'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/40 z-10'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='relative bg-white w-full h-fit py-20 px-2 rounded-xl'>
                    <div className='absolute top-4 right-4'>
                        <CloseModal />
                    </div>

                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default SignInPage
