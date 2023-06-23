import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserNameForm } from '../components';


export const metadata = {
    title: 'Breadit - Settings',
    description: 'Manage account and website settings',
}

const SettingsPage = async () => {

    const session = await getAuthSession();

    if (!session?.user) {
        redirect(authOptions.pages?.signIn || '/signin');
    }

    return (
        <div className='max-w-4xl mx-auto py-12'>
            <div className='grid items-start gap-8'>
                <h1 className='font-bold text-3xl md:text-4xl'>
                    Settings
                </h1>
            </div>

            <div className='grid gap-10'>
                <UserNameForm user={{
                    id: session?.user.id,
                    username: session?.user.username || ''
                }} />
            </div>
        </div>
    )
}

export default SettingsPage
