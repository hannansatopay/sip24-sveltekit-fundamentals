import prisma from '../../lib/prisma.js';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // Ensure the file data is correctly parsed
    if (formData.has('dropzone')) {
      const file = formData.get('dropzone');
      // Handle file processing (e.g., saving to disk or cloud storage)
      data.image = file.name; // Example, set image name
    }

    // Save to database using Prisma
    try {
      await prisma.post.create({
        data: {
          username: data.username,
          content: data.content,
          image: data.image || '' // Ensure this is set correctly based on your file handling logic
        }
      });

      // Redirect to home page after successful save
      return {
        status: 303, // Status code for redirection
        headers: {
          location: '/'
        }
      };
    } catch (error) {
      console.error('Error saving to database:', error);
      return {
        status: 500,
        body: {
          error: 'There was an error saving the data'
        }
      };
    }
  }
};
