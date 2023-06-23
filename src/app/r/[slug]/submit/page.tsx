import { Editor } from '@/app/components';
import { Button } from '@/app/components/ui/Button';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';


export const metadata = {
    title: 'Breadit - Create Post',
    description: 'Create a new post in a subreddit',
}


interface PageProps {
    params: {
        slug: string
    }
}

const PostPage = async ({
    params
}: PageProps) => {

    const { slug } = params;

    const subreddit = await db.subreddit.findFirst({
        where: {
            name: slug
        }
    });

    if (!subreddit) {
        return notFound();
    }


    return (
        <div className='flex flex-col items-start gap-6'>
            <div className='border-b border-gray-200 pb-5'>
                <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
                    <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
                        Create Post
                    </h3>
                    <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
                        in r/{slug}
                    </p>
                </div>
            </div>

            {/* form */}

            <Editor subredditId={subreddit.id} />

            <div className='w-full flex justify-end'>
                <Button
                    type='submit'
                    className='w-full '
                    // this will trigger when the form is submitted with this id
                    form='subreddit-post-form'
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default PostPage
