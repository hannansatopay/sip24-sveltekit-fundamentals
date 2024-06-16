import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const { username, content } = data;
        const file = data.image;

        let image = '';
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            image = Buffer.from(arrayBuffer).toString('base64');
        }

        await prisma.post.create({
            data: {
                username,
                content,
                image,
            },
        });

        throw redirect(302, '/')

    }
};
