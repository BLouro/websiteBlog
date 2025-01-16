import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  date: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    import("../content/config.json").then((config) => setPosts(config.blogPosts));
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link> - {post.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
