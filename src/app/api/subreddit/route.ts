import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse('Uanuthorized', { status: 401 })
        }

        const body = await request.json();

        const { name } = SubredditValidator.parse(body);

        const subredditExists = await db.subreddit.findFirst({
            where: {
                name: name
            }
        });

        if (subredditExists) {
            return new NextResponse('Subreddit already exists', { status: 409 })
        }

        const subreddit = await db.subreddit.create({
            data: {
                name: name,
                creatorId: session.user.id
            }
        });

        await db.subscription.create({
            data: {
                userId: session.user.id,
                subredditId: subreddit.id
            }
        });

        return new NextResponse(subreddit.name);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }

        return new Response('Could not create subreddit', { status: 500, })
    }
}