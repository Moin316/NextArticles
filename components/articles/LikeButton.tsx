"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { toggleLike } from "@/actions/LikeDislike";
import { Likes } from "@prisma/client";

type LikeButtonProps = {
  articleId: string;
  likes: Likes[];
  isLiked: boolean;
};

const LikeButton = ({ articleId, likes, isLiked: initialLiked }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isPending, startTransition] = useTransition();

  const handleLikeDislike = () => {
    // Optimistically update UI
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));

    startTransition(async () => {
      try {
        await toggleLike(articleId);
        // Optionally, fetch fresh like data here to sync server state
      } catch (error) {
        // If error, revert optimistic update
        setIsLiked(isLiked);
        setLikeCount(prev => (isLiked ? prev + 1 : prev - 1));
        console.error("Failed to toggle like:", error);
      }
    });
  };

  return (
    <div className="flex border-t pt-4 gap-4">
      <Button onClick={handleLikeDislike} variant="ghost" className="gap-2" disabled={isPending}>
        
        <ThumbsUp className="w-4 h-4 mr-2" />
        {likeCount}
      </Button>

      <Button variant="ghost" className="gap-2">
        <Bookmark className="w-4 h-4" />
        Save
      </Button>

      <Button variant="ghost" className="gap-2">
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  );
};

export default LikeButton;
