import prisma from '$lib/prisma';
import {redirect} from '@sveltejs/kit';
export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
      
      const data = {
        username: formData.get('username'),
        content: formData.get('description'),
        image: formData.get('image') // This will be a File object
      };
      let username = data.username;
      let content = data.content;
      let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');

    await prisma.post.create({
        data: {
            username: username,
            content: content,
            image: image
        }
    })
    throw redirect(302,"/");
    }
  };
  
  