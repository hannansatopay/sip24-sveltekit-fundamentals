import { redirect } from "@sveltejs/kit";
import prisma from "slib/prisma";

export const action = {
    default: async ({ request}) =>{
                const data = object.fromEntries(await request.formData());
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