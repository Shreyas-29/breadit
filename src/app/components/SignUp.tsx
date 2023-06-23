import Link from 'next/link'
import { Icons } from './Icons'
import UserAuthForm from './UserAuthForm'


const SignUp = () => {
    return (
        <div className='container mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[400px]'>
            <div className='flex flex-col space-y-3 text-center'>
                <Icons.logo className='w-8 h-8 mx-auto' />
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Sign Up to Breadit
                </h1>
                <p className='text-sm max-w-xs mx-auto'>
                    By continuing, you are setting up a Breadit account and agree to our Terms of Service and Privacy Policy.
                </p>

                <UserAuthForm />

                <p className='px-8 text-center text-sm text-zinc-700'>
                    Already a Member?{' '}
                    <Link href='/signin' className='hover:text-zinc-900 text-sm transition'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
