import React from 'react'
import { MyButton } from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom'

export const PostItem = function (props) {
    const router = useNavigate()
    console.log(router);
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>
                Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    )
}