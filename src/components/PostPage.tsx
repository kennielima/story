"use client"
import React, { useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BookIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageContent, TextContent } from "@/lib/types";
import PostContentBlock from "@/components/post-content-block";
import { capitaliseFirstLetter, getDaysAgo } from "@/lib/utils";
import { useParams } from 'next/navigation';
import { useFetchEachPost, postComment } from "@/lib/hook";
import Comments from './Comments';

const PostPage = () => {
    const [comment, setComment] = useState('')

    const { id } = useParams();
    const { data } = useFetchEachPost(id);
    let post = data;
    console.log(comment);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postComment(id, comment);
            setComment('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    }

    return (
        <main className="bg-background rounded-lg border p-6 grid gap-4">
            <div className="flex items-center gap-4">
                <Avatar className="size-10">
                    <AvatarImage src={post?.authorAvatar} alt={post?.author} />
                    <AvatarFallback>{post?.author.split(" ").map((n: any[]) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{post?.title}</h3>
                    <div className="text-sm text-muted-foreground">
                        {post?.author} • {capitaliseFirstLetter(getDaysAgo(post?.datePublished))}
                    </div>
                </div>
            </div>
            <article className="grid gap-4">
                {post?.content.map((item: (TextContent | ImageContent), index: number) => (
                    <PostContentBlock key={index} item={item} />
                ))}
            </article>
            <div className="space-y-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Button variant="ghost" size="icon" className={`hover:text-green-600 ${post?.userVote == 'upvote' && 'text-green-500'}`}>
                        <ArrowUpIcon className="w-5 h-5" />
                    </Button>
                    <span>{post?.voteCount}</span>
                    <Button variant="ghost" size="icon" className={`hover:text-red-600 ${post?.userVote == 'downvote' && 'text-red-500'}`}>
                        <ArrowDownIcon className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <form className="grid gap-4 pr-4" onSubmit={handleSubmit}>
                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="rounded-md border border-input bg-background text-sm"
                />
                <div>
                    <Button type='submit'>Post Comment</Button>
                </div>
            </form>
            <Comments postid={id} />
        </main>
    )
}

export default PostPage