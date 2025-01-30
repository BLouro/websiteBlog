import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const POSTS_REPO_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts/";

const BlogPost: React.FC = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${POSTS_REPO_URL}${postId}.md`);
        if (!response.ok) throw new Error("Post not found.");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent("Post not found.");
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;