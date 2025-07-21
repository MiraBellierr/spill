import { useState, useEffect } from 'react';
import divider from "../assets/divider.png";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
const IP = import.meta.env.IP || '194.233.87.80';
const PORT = import.meta.env.PORT || '5000';

type Post = {
    id: string | number;
    title: string;
    author: string;
    createdAt: string;
    content: string;
};

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://${IP}:${PORT}/api/posts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
            <Header />

            <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                <div className="flex-grow flex-col">
                    <Navigation />
                </div>

                <main className="w-full lg:w-3/5 space-y-4 p-4">
                  {loading ? (
                    <div className="bg-white p-4 border border-blue-300 rounded-xl shadow text-center">
                      <p>Loading posts...</p>
                    </div>
                  ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl">
                      Error: {error}
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="space-y-1 bg-white p-4 border border-blue-300 rounded-xl shadow">
                      <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">No posts yet</h2>
                      <img src="https://media1.tenor.com/m/vk4u2ez6sHUAAAAd/kanna-eating.gif" alt="No posts" className="mx-auto" />
                    </div>
                  ) : (
                    posts.map((post, index) => (
                      <>
                        <div key={post.id} className="bg-white p-4 border border-blue-300 rounded-xl shadow">
                          <h2 className="text-xl font-bold text-blue-700 mb-2">{post.title}</h2>
                          <p className="text-sm text-blue-500 mb-2">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
                          <div 
                            className="prose prose-blue max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                        </div>
                        
                        {index < posts.length - 1 && (
                          <div className="flex flex-row">
                            <img className="h-5 w-60" src={divider} alt="divider" />
                            <img className="h-5 w-60" src={divider} alt="divider" />
                            <img className="h-5 w-60" src={divider} alt="divider" />
                          </div>
                        )}
                      </>
                    ))
                  )}

                  {/* Keep the bottom divider */}
                  <div className="flex flex-row">
                    <img className="h-5 w-60" src={divider} alt="divider" />
                    <img className="h-5 w-60" src={divider} alt="divider" />
                    <img className="h-5 w-60" src={divider} alt="divider" />
                  </div>
                </main>

                <div className="flex-col">
                    <div className="mt-3 mb-auto lg:w-[200px]">
                        <div className="h-101 border rounded-2xl p-2 bg-blue-200 border-blue-300 shadow-md hover:animate-wiggle">
                          <Link to="/blog/edit" className="text-blue-600">
                            <h3 className="font-bold text-blue-600 text-center">Click here to create a post</h3>
                          </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Blog;