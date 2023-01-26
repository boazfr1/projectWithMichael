import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "./userInfoContext";


function Posts() {
    const userInfo = useContext(userInfoContext);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [bool, setBool] = useState([])


    useEffect(() => {
        let myList = []
        let answerArr = []
        let emptyArr = []
        let boolArr = []
        fetch(`http://localhost:3002/user/posts/all/${userInfo.myInfo.id}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log("data anser:", data.answer);
                // console.log("data.length:", data.answer.length);
                for (let i = 0; i < data.answer.length; i++) {
                    myList.push({
                        "title": data.answer[i].title,
                        "id": data.answer[i].id
                    })
                    fetch(`http://localhost:3002/user/comments/all/${data.answer[i].id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("data:", data);
                        for (let j = 0; j < data.answer.length; j++) {
                            answerArr.push(data.answer[i].body.data);
                        }
                        emptyArr.push(answerArr)
                    })
                    boolArr.push(false);
                }
                setPosts(myList);
                setComments(emptyArr);
                setBool(boolArr);
            })
        // console.log("posts:", posts);

    }, []);

    function showComments(index) {
        let bollArr = [...bool]
        bollArr[index] ? bollArr[index] = false : bollArr[index] = true;
        setBool(bollArr);    
    }
    return (
        <div>
            <h1>posts</h1>
            {<div className="post-area">{posts.map((post, index) =>
                <p className="post" key={index}>
                    {post.title}
                    <button onClick={(() => showComments(index))}>show comments</button>
                    <div>
                        {console.log("comments:", comments)}
                        {bool[index] ? <div className="comment-area">{comments[index].map((comment, i) =>
                        <p className="comment" key={i}><br />{comment}</p>
                    )}</div> : <p></p>}
                    </div>
                </p>
                
            )
            }
            </div>}
        </div>
    )
}

export default Posts;