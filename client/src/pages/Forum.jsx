import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        fetchPosts();
    }, [user, navigate]);

    const fetchPosts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${API_URL}/api/posts`, config);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/posts`, { title, content }, config);
            setTitle('');
            setContent('');
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            <Navbar />

            <div className="container mx-auto max-w-5xl px-6 py-10">
                <h2 className="text-4xl font-bold text-white mb-2 italic">PADDOCK <span className="text-red-600">CHAT</span></h2>
                <p className="text-slate-400 mb-10">Join the discussion with other fans.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Post Section */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 bg-slate-800/80 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">New Transmission</h3>
                            <form onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Headline</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="input-field"
                                        placeholder="What's on your mind?"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Message</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="input-field h-32 resize-none"
                                        placeholder="Share your analysis..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full btn-primary">
                                    Broadcast
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="lg:col-span-2 space-y-4">
                        {posts.map((post) => (
                            <div key={post._id} className="card p-6 border-l-4 border-l-red-600 hover:border-l-red-500">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white tracking-wide">{post.title}</h3>
                                    <span className="text-xs text-slate-500 uppercase font-bold">{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-slate-300 mb-4 leading-relaxed">{post.content}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        {post.username[0].toUpperCase()}
                                    </div>
                                    <span className="text-sm text-slate-400 font-medium">@{post.username}</span>
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                                <p className="text-slate-500 text-lg">Radio Check... No transmissions yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
