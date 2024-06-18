import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function POST({ request }) {
    const { postId } = await request.json();

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } }
    });

    return json(updatedPost);
    
}
