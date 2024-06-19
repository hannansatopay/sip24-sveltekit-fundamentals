/** @format */

import prisma from "$lib/prisma";

export const load = async () => {
  // Fetch all posts from the database
  const result = await prisma.post.findMany();

  // Reverse the array of posts
  return { posts: result.reverse() };
};
