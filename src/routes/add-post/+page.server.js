import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const Data = Object.fromEntries(await request.formData());
        let username = Data.username;
        let content = Data.content;
        let image = Buffer.from(await Data.image.arrayBuffer()).toString('base64');
        //console.log(Data);


        await prisma.post.create({
            data: {
                Username: username,
                content: content,
                Image: image
            }
        });

        throw redirect(302, "/");
    } 
}