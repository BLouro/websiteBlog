import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost: React.FC = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(`/${postId}.md`)
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Failed to load markdown file:", error));
  }, [postId]);

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;

