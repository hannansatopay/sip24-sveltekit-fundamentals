import prisma from '$lib/prisma';

export async function load() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    posts: posts.map(post => ({
      ...post,
      image: post.image.toString('base64')
    }))
  };
}
``
