It was made for a SvelteKit Fundamentals course, a key part of the Summer Internship Program 2024. In this tutorial, you'll learn the basics of SvelteKit by building an Instagram clone.

# Drop-Post Image Sharing (with PrismaDB)

This project is a hands-on learning experience combining Vite, Svelte, and PrismaDB to create a simple social media-style website. Users can upload images, provide usernames and captions, and even apply filters to their photos.

## Key Features

*   **Image Uploads:** Store user-uploaded images securely.
*   **User Profiles:** Associate usernames and images.
*   **Captions:** Allow users to add descriptions to their photos.
*   **Image Filters:** Provide basic image editing options (optional).
*   **PrismaDB ORM:** Flexible database interaction (uses SQLite in this example).

## Tech Stack

*   **Vite:** Fast development server and build tool.
*   **Svelte:** Modern and efficient UI framework.
*   **PrismaDB:** Database ORM for simplified data management.
*   **SQLite:** Lightweight relational database (default in this example).
*   **Cloudinary (Optional):** Image storage and filter management.

## Prerequisites

*   Node.js and npm (or yarn) installed

## Installation

1.  **Clone the repository:** `git clone https://github.com/nav9v/DropPost`
2.  **Install dependencies:**
    *   `npm install` (or `yarn install`)
    *   `npm install prisma --save-dev`
    *   `npm install @prisma/client`

3.  **Initialize Prisma:**
    *   For **SQLite:** `npx prisma init --datasource-provider sqlite` (This creates a `prisma` directory and sets up SQLite as your database)
    *   For **PostgreSQL:** `npx prisma init --datasource-provider postgresql` (This creates a `prisma` directory and sets up PostgreSQL as your database. You will need to update the `DATABASE_URL` in the `.env` file with your PostgreSQL connection string)

4.  **Apply initial migration:**
    *   For **SQLite:** `npx prisma migrate dev --name init`
    *   For **PostgreSQL:** `npx prisma migrate dev --name init`

5.  **Start the development server:** `npm run dev` (or `yarn dev`)

## Usage

1.  Open your web browser and navigate to `http://localhost:5173`
2.  Upload images, add captions, and explore the filtering options (if implemented).
3.  **Open Prisma Studio:** `npx prisma studio` (for visually inspecting and managing your database)

## Configuration (SQLite Example)

**`prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  image     String
  content   String
  username  String
  createdAt DateTime @default(now())
}
```
**`.env`**

```
DATABASE_URL="file:./dev.db"
```

## How to Contribute

1. Fork the current repository.
2. Clone the forked repository to your local machine.
3. Create a new branch with your name.
4. Implement the app by following the tutorial.
5. Commit your changes and push them to your forked repository.
6. Create a pull request to the main repository.

### Additional Challenge

Develop an image viewer and photo filter editor using HTML5 canvas. This setup should allow users to preview the uploaded image, and then apply basic filters like grayscale or sepia.

This challenge is designed to push your skills further and give you hands-on experience with a more complex application feature.
