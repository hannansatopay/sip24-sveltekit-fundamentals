import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData.entries());
      let { username, content } = data;
      let image;

      if (data.image.size > 0) {
        // Convert image to base64 string
        const arrayBuffer = await data.image.arrayBuffer();
        image = Buffer.from(arrayBuffer).toString('base64');
      }

      // Create a new post in the database
      const post = await prisma.post.create({
        data: {
          username,
          content,
          image,
        },
      });

      console.log("Post created:", post);
      
      return {
        status: 201,
        body: { success: true },
      };
    } catch (error) {
      console.error("Error creating post:", error);
      return {
        status: 500,
        body: { success: false, error: 'Internal Server Error' },
      };
    }
    throw redirect( 302,"/");
  },
};
