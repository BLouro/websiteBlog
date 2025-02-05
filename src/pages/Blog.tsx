import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const POSTS_JSON_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts.json";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<{ id: string; title: string; date: string }[]>([]);

  useEffect(() => {
    fetch(POSTS_JSON_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failled to load posts:", err));
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
