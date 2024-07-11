export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        let username = data.username;

        console.log(username);
    }
};

