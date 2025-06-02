"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { editArticle } from "@/actions/edit-articles";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type Props = {
  article: {
    id: string;
    title: string;
    content: string;
    category: string;
    featuredImage?: string | null;
  };
};

const EditArticlePage = ({ article }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [content, setContent] = useState(article.content);
  const [image, setImage] = useState(article.featuredImage || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editArticle({
      articleId: article.id,
      title,
      category,
      content,
      featuredImage: image,
    });

    router.push(`/articles/${article.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <Input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Featured Image URL"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={10}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditArticlePage;
