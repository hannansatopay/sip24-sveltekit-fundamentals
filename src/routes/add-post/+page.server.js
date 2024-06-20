import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';


export const actions = {
    default: async ({ request }) => {

        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        // const data = await Object.fromEntries(request.formData.entries())

        let username = data.username;
        let content = data.content;
        let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');

        await prisma.post.create({
            data: {
                username,
                content,
                image
            }
        });

        throw redirect(302, "/");
    }
}