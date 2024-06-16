import { Redirect, redirect } from "@sveltejs/kit";
import  Prisma  from "$lib/Prisma";

export const actions={
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        let username = date.username;
        let content = data.content;
        let image = Buffer.from(await data.image.arrayBuffer()).tostring('base64');
        
        await Prisma.post.create({
            data:{
                username,
                content,
                image
            }
        });
        throw redirect(302,"/");
    }
}