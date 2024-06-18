import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        
        let username = data.get('username');
        let content = data.get('content');
        let image = null;

        const imageFile = data.get('image');
        if (imageFile) {
            image = Buffer.from(await imageFile.arrayBuffer()).toString('base64');
        }

        await prisma.post.create({
            data: {
                username,
                content,
                image
            }
        });
        throw redirect(302,"/")
    }
};
