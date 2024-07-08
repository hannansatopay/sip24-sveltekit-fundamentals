// src/routes/api/postImage.js
import { redirect } from "@sveltejs/kit";
import prisma from '$lib/prisma';

export const post = async (request) => {
  const formData = Object.fromEntries(await request.formData());
  const image = formData.image;

  try {
    await prisma.post.create({
      data: {
        image: image, // Assuming `image` is a base64 sg
       
      },trin
    });

    return {
      status: 200,
      body: {
        message: 'Image posted successfully'
      }
    };
  } catch (error) {
    console.error('Error posting image:', error);
    return {
      status: 500,
      body: {
        message: 'Failed to post image'
      }
    };
    throw redirect(302, "/");
  }
};
