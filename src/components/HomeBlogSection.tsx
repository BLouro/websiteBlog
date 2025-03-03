import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const POSTS_JSON_URL = "https://raw.githubusercontent.com/blouro/websiteBlog-posts/master/posts.json";

const HomeBlogSection: React.FC = () => {
  const [posts, setPosts] = useState<{ id: string; title: string; date: string }[]>([]);

  useEffect(() => {
    fetch(POSTS_JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        // Ordenar os posts pela data (mais recente primeiro)
        const sortedPosts = data.sort((a: { date: string }, b: { date: string }) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // Filtrar apenas os 3 primeiros posts
        setPosts(sortedPosts.slice(0, 3));
      })
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  // Get the 3 most recent posts
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-bg-slate-800 dark:text-white mb-8">
         Check out my latest posts
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
              <div className="bg-white dark:bg-dark-header p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-bg-slate-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="bg-slate-400 hover:bg-slate-800 dark:hover:bg-dark-header inline-block px-6 py-3 text-lg font-semibold text-white   rounded-lg transition" 
          >
            Blog Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
