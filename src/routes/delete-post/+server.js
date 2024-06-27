import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async ({ request }) => {
    const { id } = await request.json();

    try {
        await prisma.post.delete({
            where: { id: Number(id) }
        });

        return json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return json({ success: false, error: 'Failed to delete the post' }, { status: 500 });
    }
};
