import { Comment } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { capitaliseFirstLetter, getDaysAgo } from "@/lib/utils";
import { deleteComment } from "@/lib/hook";

/**
 * Displays a comment with author details and content.
 */
type CommentCardProps = {
    comment: Comment,
    postId: { postid: number }
}
export default function CommentCard({ comment, postId }: CommentCardProps) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await deleteComment(postId.postid, comment.id);
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    }
    return (
        <div className="flex items-center justify-between border border-border rounded-md p-4">
            <div className="flex flex-col">
                <div className="flex items-start gap-4">
                    <Avatar className="size-8">
                        <AvatarFallback>{comment.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{comment.author}</div>
                        <div
                            className="text-muted-foreground text-sm">{capitaliseFirstLetter(getDaysAgo(comment.createdAt))}</div>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm mt-4">{comment.content}</p>
            </div>
            {comment.author && 
            <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-red-600"
                onClick={handleDelete}
            >
                <XIcon className="size-5" />
            </Button>}
        </div>
    );
}