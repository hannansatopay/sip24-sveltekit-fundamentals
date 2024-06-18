import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function POST({ request }) {
    const { postId } = await request.json();

    try {
        const post = await prisma.post.delete({
            where: { id: Number(postId) }
        });

        if (post) {
            return json({ status: 'Post deleted', post: post });
        } else {
            return json({ status: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Failed to delete post:', error);
        return json({ status: 'Error deleting post', error: error.message }, { status: 500 });
    }
}
