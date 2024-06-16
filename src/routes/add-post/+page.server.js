import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    const image = data.get('image');
    const username = data.get('username');
    const content = data.get('content');
    
    let imagePath = null;
    if (image && image.name) {
      const imageBuffer = await image.arrayBuffer();
      const imageName = `${uuidv4()}-${image.name}`;
      const imageFilePath = path.join('static/uploads', imageName);
      
      fs.writeFileSync(imageFilePath, Buffer.from(imageBuffer));
      imagePath = `/uploads/${imageName}`;
    }

    const post = await prisma.post.create({
      data: {
        username,
        content,
        image: imagePath
      }
    });

   
    throw redirect(303, "/");
  }
};
