import React from 'react'
import { Comment, Post } from "@/lib/types";
import CommentCard from "@/components/comment-card";
import { useGetComments } from '@/lib/hook';

const Comments = (postId: { postid: string | string[]}) => {
    const { data } = useGetComments(postId);
    console.log(data)

    return (
        <div className="grid gap-4">
            {data.length > 0 ?
                data.map((comment: Comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                )) : (
                    <p>No comments available</p>
                )}
        </div>
    )
}

export default Comments