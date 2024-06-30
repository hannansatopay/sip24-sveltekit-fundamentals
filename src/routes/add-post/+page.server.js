// for redirecting user to homepage after posting post 
import { redirect } from "@sveltejs/kit";

// for storing/save a data to db
import prisma from '$lib/prisma';


// for extracting or fetching a data from a database
export const actions = {
    default : async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        // if u want to fetch specfic data such as username 
        let username = data.username;
        let content = data.content;
        // console.log(username);
        let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');
        // console.log(data); //for extracting all data which has been shared

        await prisma.post.create({
            data: {
                username,
                content,
                image 
            }
        })
        
        throw redirect(302,"/");
    }
}
// to see wheter its added in db or not use command [prisma studio]