import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { votePost } from '@/lib/hook';

const Votes = ({ post }: any) => {
    const [userVote, setUserVote] = useState(post?.userVote);
    const [voteCount, setVoteCount] = useState(post?.voteCount);

    const handleUpvote = async () => {
        try {
            if (userVote === 'upvote') {
                setUserVote('none');
                setVoteCount(voteCount - 1);
            } else {
                setUserVote('upvote');
                setVoteCount(userVote === 'downvote' ? voteCount + 2 : voteCount + 1);
                await votePost(post.id, { voteType: 'upvote' });
            }
        } catch (error) {
            console.error('Failed to upvote:', error);
        }
    };

    const handleDownvote = async () => {
        try {
            if (userVote === 'downvote') {
                setUserVote('none');
                setVoteCount(voteCount + 1);
            } else {
                setUserVote('downvote');
                setVoteCount(userVote === 'upvote' ? voteCount - 2 : voteCount - 1);
                await votePost(post.id, { voteType: 'downvote' });
            }
        } catch (error) {
            console.error('Failed to downvote:', error);
        }
    };
    return (
        <div className="flex items-center gap-1 text-muted-foreground">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleUpvote}
                className={`hover:text-green-600 ${post?.userVote == 'upvote' && 'text-green-500'}`}
            >
                <ArrowUpIcon
                    className="w-5 h-5" />
            </Button>
            <span>{post?.voteCount}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDownvote}
                className={`hover:text-red-600 ${post?.userVote == 'downvote' && 'text-red-500'}`}
            >
                <ArrowDownIcon className="w-5 h-5" />
            </Button>
        </div>)
}

export default Votes