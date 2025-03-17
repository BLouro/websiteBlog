import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const POSTS_REPO_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts/";
const COVERS_REPO_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/covers/";
const POSTS_JSON_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts.json";

// Definição do tipo para os posts
interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  coverImage: string;
  readingTime: number;
}

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(POSTS_JSON_URL);
        if (!response.ok) throw new Error("Failed to load posts.");
        const posts: Post[] = await response.json();
        const postDetails = posts.find((p: Post) => p.id === postId) || null;
        if (!postDetails) throw new Error("Post not found.");
        setPost(postDetails);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPostContent = async () => {
      try {
        const response = await fetch(`${POSTS_REPO_URL}${postId}.md`);
        if (!response.ok) throw new Error("Post not found.");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent("Post not found.");
      }
    };

    fetchPostDetails();
    fetchPostContent();
  }, [postId]);

  if (!post) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
      <img src={`${COVERS_REPO_URL}${post.coverImage}`} alt={post.title} className="w-full h-64 object-cover rounded-md" />
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
        <p>{post.author}</p>
        <p>{new Date(post.date).toLocaleDateString()}</p>
        <p>{post.readingTime} min read</p>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <ReactMarkdown className="prose dark:prose-invert">{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;