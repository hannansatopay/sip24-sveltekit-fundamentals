import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST({ request }) {
    const { id } = await request.json();

    try {
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Failed to delete post:', error);
        return new Response(JSON.stringify({ success: false, error: 'Failed to delete post' }), { status: 500 });
    }
}
