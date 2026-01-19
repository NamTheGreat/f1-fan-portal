import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RaceDetails = () => {
    const [race, setRace] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        const fetchRace = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${API_URL}/api/races/${id}`);
                setRace(response.data);
            } catch (error) {
                console.error('Error fetching race details:', error);
            }
        };

        fetchRace();
    }, [user, navigate, id]);

    if (!race) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Telemetry...</div>;

    return (
        <div className="min-h-screen pb-20">
            <Navbar />

            <div className="container mx-auto max-w-6xl px-6 py-10">
                <button onClick={() => navigate('/dashboard')} className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors uppercase text-xs font-bold tracking-widest">
                    ← Back to Race Control
                </button>

                <div className="card overflow-hidden">
                    {/* Header */}
                    <div className="relative h-64 bg-slate-800 overflow-hidden flex items-end p-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                        {/* Abstract background */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600 rounded-full blur-[100px] opacity-50"></div>

                        <div className="relative z-20">
                            <span className="block text-red-500 font-bold uppercase tracking-widest mb-1">Round {race.round}</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white italic leading-none">{race.name}</h1>
                            <p className="text-xl text-slate-300 mt-2 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-red-600 inline-block skew-x-[-10deg]"></span>
                                {race.circuit}
                            </p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {/* Stats */}
                            <div className="lg:col-span-1 space-y-4">
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-red-600/50 transition-colors group">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Race Intelligence</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-slate-400 text-xs uppercase">Date</span>
                                            <span className="text-white font-bold text-lg">{race.date ? new Date(race.date).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-400 text-xs uppercase">Location</span>
                                            <span className="text-white font-bold text-lg">{race.country}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-400 text-xs uppercase">Lap Record</span>
                                            <span className="text-red-500 font-bold text-lg">{race.lapRecord}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Track Intel</h3>
                                    <p className="text-slate-300 italic text-sm leading-relaxed">"{race.trivia}"</p>
                                </div>
                            </div>

                            {/* Media */}
                            <div className="lg:col-span-2">
                                <div className="bg-black/50 p-1 rounded-xl border border-slate-700">
                                    <div className="aspect-w-16 aspect-h-9 w-full">
                                        <iframe
                                            className="w-full h-[400px] rounded-lg shadow-2xl"
                                            src={`https://www.youtube.com/embed/${race.videoId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                <p className="text-center text-slate-500 text-xs mt-4 uppercase tracking-widest">Official Highlights</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceDetails;
