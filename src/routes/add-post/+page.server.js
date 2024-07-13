import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) =>{
        const data = Object.fromEntries(await request.formData());
        let username = data.username;
        let content = data.content;
        
        // Decode base64 data URL
        let imageBase64 = data.image.split(',')[1];
        let image = Buffer.from(imageBase64, 'base64');
        
        await prisma.post.create({
            data:{
                username,
                content,
                image: imageBase64  // Save the base64 string
            }
        });

        throw redirect(302, '/');
    }
}
