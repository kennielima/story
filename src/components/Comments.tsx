import React from 'react'
import { Comment, Post } from "@/lib/types";
import CommentCard from "@/components/comment-card";
import { useGetComments } from '@/lib/hook';

const Comments = (postId: any) => {
    const { data, isLoading } = useGetComments(postId);

    if (isLoading) return <div>Loading comments...</div>;
    return (
        <div className="grid gap-4">
            {data.length > 0 ?
                data.map((comment: Comment) => (
                    <CommentCard key={comment.id} comment={comment} postId={postId} />
                )) : (
                    <p>No comments available</p>
                )}
        </div>
    )
}

export default Comments