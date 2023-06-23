import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import PostFeed from './PostFeed'

const CustomFeed = async () => {

    const session = await getAuthSession();

    const followedCommunities = await db.subscription.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            subreddit: true
        }
    });

    const posts = await db.post.findMany({
        where: {
            subreddit: {
                name: {
                    in: followedCommunities.map(sub => sub.subreddit.name)
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            comments: true,
            author: true,
            subreddit: true
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS
    });

    return (
        //<div className='pb-32'>
        <PostFeed initialPosts={posts} />
        //</div>
    )
}

export default CustomFeed
