import React, { useEffect, useState } from "react";

function Comments(props) {
    const [comments, setComments] = useState([])

    async function fetchComments() {
        let commentsPromise = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${props.postId}`)
        let comments = await commentsPromise.json()
        setComments(comments)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div>{comments.map((comment, i) => (
            <div key={i}>
                <div>
                    <h4>{`${comment.email}`}</h4>
                    <span>{`${comment.name}`}</span>
                    <p>{`${comment.body}`}</p>
                </div>
            </div>
        ))}

        </div>
    )
}

export default Comments;