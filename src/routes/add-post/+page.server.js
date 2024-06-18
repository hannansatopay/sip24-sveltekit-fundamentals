export const actions = {
    default: async ({ request }) => {
        const data = await Object.fromEntries(request.formData());

        console.log(data);
    }
}