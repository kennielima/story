"use client";
import React from 'react'
import { ArrowDownIcon, ArrowUpIcon, BookIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types";
import { capitaliseFirstLetter, getDaysAgo } from "@/lib/utils";
import { useFetchPosts } from '@/lib/hook';

function getAuthorInitials(authorName: string) {
    return authorName.split(' ').map(name => name[0]).join('');
}

const Feed = () => {
    const { data } = useFetchPosts()
    const posts = data?.posts;
    
    return (
        <main>
            {posts && posts.map((post: Post, index: number) => (
                <article key={index} className="bg-background rounded-lg border p-6 grid gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={post.authorAvatar} alt={post.author} />
                            <AvatarFallback>{getAuthorInitials(post.author)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                                <Link href={`/post/${post.id}`} prefetch={false}>
                                    {post.title}
                                </Link>
                            </h3>
                            <div className="text-sm text-muted-foreground">
                                {post.author} • {capitaliseFirstLetter(getDaysAgo(post.datePublished))}
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Button variant="ghost" size="icon" className={`hover:text-green-600 ${post.userVote == 'upvote' && 'text-green-500 bg-accent'}`}>
                                <ArrowUpIcon className="w-5 h-5" />
                            </Button>
                            <span>{post.voteCount}</span>
                            <Button variant="ghost" size="icon" className={`hover:text-red-600 ${post.userVote == 'downvote' && 'text-red-500 bg-accent'}`}>
                                <ArrowDownIcon className="w-5 h-5" />
                            </Button>
                        </div>
                        <Link href={`/post/${post.id}`} className="text-sm text-primary hover:underline" prefetch={false}>
                            Read more
                        </Link>
                    </div>
                </article>
            ))}
        </main>
    )
}

export default Feed
