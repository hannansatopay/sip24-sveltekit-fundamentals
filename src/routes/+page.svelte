<script>
    export let data;

</script>
<header class="bg-white py-3 shadow-md px-2  sticky">
    <div class="flex justify-between items-center">
        <h1 class="font-bold text-3xl font-['Comic_Sans_MS']">MustPost</h1>
        <a href="./add_post" class="bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white font-bold rounded">Add Post</a>
    </div>
</header>
<div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mt-2">

   
    {#each data.posts.slice().reverse() as post }
    <div class="card">
        <div class="top">
            <div class="userDeatils">
                <div class="profileImg">
                    <img src="https://c8.alamy.com/comp/2JK9TGD/goku-television-dragon-ball-z-tv-serie-characters-goku-jp-19962003-13-september-1996-warning-this-photograph-is-for-editorial-use-only-and-is-the-copyright-of-toei-animation-andor-the-photographer-assigned-by-the-film-or-production-company-and-can-only-be-reproduced-by-publications-in-conjunction-with-the-promotion-of-the-above-film-a-mandatory-credit-to-toei-animation-is-required-the-photographer-should-also-be-credited-when-known-no-commercial-use-can-be-granted-without-written-authority-from-the-film-company-2JK9TGD.jpg" alt="user" class="cover">
                </div>
                <h3>{post.username}</h3>
            </div>
            <div class="dot">
                <img src="https://t3.ftcdn.net/jpg/02/05/50/86/360_F_205508624_vW2g4uq40jCyC59eFgXiTHuDdPvAIiO4.jpg" alt="dot" class="w-12">
            </div>
        </div>
        <div class="imgBg">
            <img src="data:image;base64,{post.image}" alt="bg" class="cover">
        </div>
        <div class="btns">
            <div class="flex justify-evenly items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvV7-HZGFXUXH3xn95W45d7QXa7kLwhjZunA&s" alt="heart" class="heart" onclick="likeButton()">
                <img src="https://cdn0.iconfinder.com/data/icons/social-media-logo-4/32/Social_Media_instagram_comment-512.png" alt="comment">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMhRu6LXb_XJgyO23-iOSSaMgi5mYyphh7zQ&s" alt="share" class="p-1.5">
            </div>
            <div class="right">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXHFifRVJKII_hj7v3d1GmKslUouHGfi2RA&s" alt="bookmark" class="p-1.5">
            </div>
        </div>
        <h4 class="likes">5 likes</h4>
        <h4 class="message">
            <b>{post.username}</b>
            {post.content}
            
        </h4>
        <h4 class="comments">View all 3 comments</h4>
        <div class="addComments">
            <div class="userImg">
                <img src="https://c8.alamy.com/comp/2JK9TGD/goku-television-dragon-ball-z-tv-serie-characters-goku-jp-19962003-13-september-1996-warning-this-photograph-is-for-editorial-use-only-and-is-the-copyright-of-toei-animation-andor-the-photographer-assigned-by-the-film-or-production-company-and-can-only-be-reproduced-by-publications-in-conjunction-with-the-promotion-of-the-above-film-a-mandatory-credit-to-toei-animation-is-required-the-photographer-should-also-be-credited-when-known-no-commercial-use-can-be-granted-without-written-authority-from-the-film-company-2JK9TGD.jpg" alt="user" class="cover">
            </div>
            <input type="text" class="text" placeholder="Add a comment...">
        </div>
        <h5 class="postTime">1 hours ago</h5>
    </div>
   
    
        {/each}
    </div>
   
</div>
<style>
    .card{
    position: relative;
    width: auto;
    min-height: 400px;
    background: #fff;
    box-shadow: 15px 15px 60px rgba(70, 11, 11, 0.15);
    padding: 20px;
}
.card .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card .top .userDeatils{
    display: flex;
    align-items: center;
}
.card .top .userDeatils .profileImg{
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    overflow: hidden;
}
.cover{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
}
.card .top .userDeatils h3{
    font-size: 18px;
    color: #4d4d4f;
    font-weight: 700;
    line-height: 1rem;
    cursor: pointer;
}
.card .top .userDeatils span{
    font-size: 0.75em;
}
.card .top .dot{
    transform: scale(0.6);
    cursor: pointer;
}
.imgBg{
    position: relative;
    width: 100%;
    height: 320px;
    margin: 10px 0 15px;
}
.btns{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btns img{
    max-width: 24px;
    cursor: pointer;
}
.btns .left img{
    margin-right: 8px;
}
.likes{
    margin-top: 5px;
    font-size: 1em;
    color: #4d4d4f;
}
.message{
    font-weight: 400;
    margin-top: 5px;
    color: #777;
    line-height: 1.5em;
}
.message b{
    color: #262626;
}
.message span{
    color: #1d92ff;
    cursor: pointer;
}
.comments{
    margin-top: 10px;
    align-items: center;
    color: #999;
}
.addComments{
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.addComments .userImg{
    position: relative;
    min-width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
}
.addComments .text{
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 18px;
    color: #262626;
}
.addComments .text::placeholder{
    color: #777;
}
.postTime{
    margin-top: 10px;
    font-weight: 500;
    color: #777;
}
</style>