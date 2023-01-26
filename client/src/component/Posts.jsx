import React, { useState, useEffect, useContext } from "react";
import Comments from "./Comments";
import { userInfoContext } from "./userInfoContext";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [emphasized, setEmphasized] = useState(0);
    const [postId, setPostId] = useState(0);

    const userInfo = useContext(userInfoContext);


    useEffect(() => {
        allPosts()
    }, [])

    let allPosts = async function () {
        const currentUser = userInfo.myInfo
        let postsPromise = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}                   `);
        let posts = await postsPromise.json();
        setPosts(posts);
    };
    function handleClick(e) {
        setEmphasized(e.target.id)
    }
    function handleClick2(e) {
        // setToggle(prev=>!prev)
        setPostId(e.target.id)
    }

    return (
        <div>{userInfo.myInfo.id}
            {/* {posts.map((post, i) => (
                <div className={emphasized == post.id ? 'emphasized' : ''} key={i}>
                    <h3 id={post.id} onClick={handleClick}>{post.title}</h3>
                    <p>{post.body}</p>
                    <div id={post.id} onClick={handleClick2}>
                        {postId == post.id ? <Comments postId={postId} /> : 'Comments...'}
                    </div>
                    <hr />
                </div>))} */}
        </div>
    )
}


export default Posts
