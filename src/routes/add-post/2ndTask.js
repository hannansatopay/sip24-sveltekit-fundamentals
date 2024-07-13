export const actions = {
    default: async({request}) => {
        const data = Object.fromEntries(await request.formData());
        let username = data.username;
        let content = data.content;
        let image = data.image;
        console.log(username);
    }
}