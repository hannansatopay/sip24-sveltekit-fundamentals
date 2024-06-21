<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftlab</title>
    <style>
        /* Global styles */
        :global(body) {
            border: 5px solid lightblue;
        }
        /* Specific styles for this page */
        .sticky {
            position: sticky;
            top: 0;
            background-color: #f0f0f0; /* Light gray background */
            z-index: 1000; /* Ensures it stays above other content */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
        }
    </style>
</head>

<body>

<header class="sticky top-0 shadow bg-gray-100">
    <div class="container mx-auto flex px-4 justify-between items-center">
        <h1 class="font-serif text-3xl font-bold py-3">Craftlab</h1>
        <a href="add-page" class="bg-blue-400 rounded-lg px-4 py-2">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div class="px-2 mt-4 mb-4">
            <span class="text-l font-bold">Username</span>
            <img class="w-full" src="https://picsum.photos/seed/pic1/600" alt="Post 1">
            <div class="text-sm py-2">
                <span class="font-bold">Username</span>
                <span class="text-gray-700">Lorem Ipsum Doler Ismet</span>
            </div>
        </div>
        <div class="px-2 mt-4 mb-4">
            <span class="text-l font-bold">Username</span>
            <img class="w-full" src="https://picsum.photos/seed/pic2/600" alt="Post 2">
            <div class="text-sm py-2">
                <span class="font-bold">Username</span>
                <span class="text-gray-700">Lorem Ipsum Doler Ismet</span>
            </div>
        </div>
        <div class="px-2 mt-4 mb-4">
            <span class="text-l font-bold">Username</span>
            <img class="w-full" src="https://picsum.photos/seed/pic3/600" alt="Post 3">
            <div class="text-sm py-2">
                <span class="font-bold">Username</span>
                <span class="text-gray-700">Lorem Ipsum Doler Ismet</span>
            </div>
        </div>
    </div>
</div>

</body>

</html>
