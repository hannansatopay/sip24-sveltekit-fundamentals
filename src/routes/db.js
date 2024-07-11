import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost(formData) {
  const { username, caption, imageFile } = Object.fromEntries(formData);

  try {
    const newPost = await prisma.post.create({
      data: {
        username,
        caption,
        imageUrl: `/uploads/${imageFile.name}`, // Adjust imageUrl as per your storage strategy
      },
    });
    return newPost;
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}
