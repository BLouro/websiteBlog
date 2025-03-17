import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const POSTS_JSON_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts.json";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<{ id: string; title: string; date: string; author: string; coverImage: string; readingTime: number; contentPreview?: string }[]>([]);

  useEffect(() => {
    fetch(POSTS_JSON_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  useEffect(() => {
    posts.forEach((post, index) => {
      fetch(`https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts/${post.id}.md`)
        .then((res) => res.text())
        .then((text) => {
          const preview = text.replace(/\n/g, ' ').slice(0, 200) + '...'
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index] = { ...post, contentPreview: preview };
            return updatedPosts;
          });
        })
        .catch((err) => console.error(`Failed to load content for post ${post.id}:`, err));
    });
  }, [posts]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="space-y-8">
        {posts.map((post) => (
          <Link to={`/blog/${post.id}`} className="text-3xl font-semibold text-slate-800 dark:text-slate-100" key={post.id}>
            <div className="space-y-4">
              {/* Post Content */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Image */}
                <div className="w-full sm:w-1/3">
                  <img
                    src={`https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/covers/${post.coverImage}`}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between w-full sm:w-2/3">
                  <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mt-3">{post.title}</h2>
                  <p className="text-sm">
                    <ReactMarkdown className="">{post.contentPreview}</ReactMarkdown>
                  </p>
                  <div className="flex items-center text-sm text-slate-800 dark:text-slate-100 mt-2 space-x-4">
                    <p>{post.author}</p>
                    <p>{new Date(post.date).toLocaleDateString()}</p>
                    <p>{post.readingTime} min read</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
