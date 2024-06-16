import prisma from "$lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return new Response(JSON.stringify(posts), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
