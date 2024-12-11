import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
export const actions ={
    default: async ({ request}) =>{
        const data=Object.fromEntries(await request.formData());
        let username =data.username;
        let content =data.content;
        let image =buffer.from(await data.image.arrayBuffer()).toString('base64');

        await prisma.post.create({
            data; {
                username;
                content;
                imagimport { redirect } from '@sveltejs/kit';
            import prisma from '$lib/prisma';

            export const actions = {
                async default({ request }) {
                    try {
                        const formData = await request.formData();
                        const username = formData.get('username');
                        const content = formData.get('content');
                        const imageFile = formData.get('image');

                        let image = null;
                        if (imageFile) {
                            const buffer = await imageFile.arrayBuffer();
                            image = Buffer.from(buffer).toString('base64');
                        }

                        await prisma.post.create({
                            data: {
                                username,
                                content,
                                image
                            }
                        });

                        return redirect(302, '/');
                    } catch (error) {
                        console.error('Error creating post:', error);
                        return {
                            status: 500,
                            body: { error: 'Internal Server Error' }
                        };
                    }
                }
            };


        }
        });

        throw redirect(302, "/");


    }
}