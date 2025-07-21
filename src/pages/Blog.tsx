import { useState, useEffect } from 'react';
import divider from "../assets/divider.png";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Post = {
    id: string | number;
    title: string;
    author: string;
    createdAt: string;
    content: string;
};

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://mirabellier.my.id/api/api/posts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
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

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const term = searchTerm.toLowerCase();
            const filtered = posts.filter(post => 
                post.title.toLowerCase().includes(term) || 
                post.content.toLowerCase().includes(term)
            );
            setFilteredPosts(filtered);
        }
    }, [searchTerm, posts]);

    return (
        <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
            <Header />

            <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                <div className="flex-grow flex-col space-y-4">
                    <Navigation />
                    <img className="w-[350px] rounded-lg border border-blue-400" src="https://media1.tenor.com/m/cJ-bh8QFs9kAAAAC/anime-kanna.gif" />
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
                    ) : filteredPosts.length === 0 ? (
                        <div className="space-y-1 bg-white p-4 border border-blue-300 rounded-xl shadow">
                            <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">
                                {searchTerm ? 'No matching posts found' : 'No posts yet'}
                            </h2>
                            <img src="https://media1.tenor.com/m/vk4u2ez6sHUAAAAd/kanna-eating.gif" alt="No posts" className="mx-auto" />
                        </div>
                    ) : (
                        filteredPosts.map((post, index) => (
                            <>
                                <div key={post.id} className="bg-white p-4 border border-blue-300 rounded-xl shadow">
                                    <h2 className="text-xl font-bold text-blue-700 mb-2">{post.title}</h2>
                                    <p className="text-sm text-blue-500 mb-2">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
                                    <div 
                                        className="prose prose-blue max-w-none"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                                
                                {index < filteredPosts.length - 1 && (
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
                    <div className="mt-3 mb-auto lg:w-[200px] space-y-4">
                        <div className="h-101 border rounded-2xl p-4 bg-blue-200 border-blue-300 shadow-md">
                            <h3 className="font-bold text-blue-600 mb-2">search posts here</h3>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <p className="mt-2 text-sm text-blue-600">
                                    {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                                </p>
                            )}
                        </div>
                        <img className="border border-blue-400 rounded-lg" src='https://media1.tenor.com/m/JhZvuXpFmvIAAAAd/kobayashi-kanna.gif' />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Blog;