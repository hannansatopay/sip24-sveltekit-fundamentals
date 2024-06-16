import prisma from '$lib/prisma';

export const load = (async() => {
    const result = await prisma.post.findMany();
    return {posts: result };
})


// export const load = async () => {
//   try {
//     const posts = await prisma.post.findMany();
//     return {
//       props: {
//         data: {
//           posts: posts,
//         },
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return {
//       status: 500,
//       error: 'Internal Server Error',
//     };
//   }
// };