import prisma from '$lib/prisma'
import {redirect} from '@sveltejs/kit'


export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        let username = data.username;
        let caption = data.caption;
        let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');

        await prisma.post.create({
            data:{username,caption,image}
        })

        throw redirect(302,"/")
    }
}