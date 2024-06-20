export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const imageFile = data.get('image');
    const username = data.get('username');
    const content = data.get('content');
    console.log({ imageFile, username, content });
    return { success: true };
  }
};