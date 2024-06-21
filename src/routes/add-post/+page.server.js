import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const username = data.username;
      const content = data.content;
      const imageFile = formData.get('image'); 

      if (!imageFile) {
        throw new Error("Image file not received");
      }

      const imageBuffer = Buffer.from(await imageFile.arrayBuffer()).toString('base64');

      console.log("Received data:", { username, content, imageBuffer });

      await prisma.post.create({
        data: {
          username,
          content,
          image: imageBuffer,
        },
      });

      console.log("Data successfully inserted into the database");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
    throw redirect(302,"/");
  },
};

