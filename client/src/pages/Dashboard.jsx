import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [races, setRaces] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        const fetchRaces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/races');
                setRaces(response.data);
            } catch (error) {
                console.error('Error fetching races:', error);
            }
        };

        fetchRaces();
    }, [user, navigate]);

    const getRaceImage = (country) => {
        // Placeholder logic for diverse images
        return `https://source.unsplash.com/800x600/?formula1,${country}`;
    };

    return (
        <div className="min-h-screen pb-20">
            <Navbar />

            <header className="relative py-20 px-8 text-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[100px] -z-10"></div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 italic tracking-tighter">
                    NEXT <span className="text-red-600">GRAND PRIX</span>
                </h1>
                <p className="text-slate-400 text-xl tracking-widest uppercase">2024 Season Calendar</p>
            </header>

            <main className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {races.map((race, index) => (
                        <div key={race.id} className="card group">
                            <div className="h-48 bg-slate-800 relative overflow-hidden">
                                {/* Fallback pattern if image fails or for speed */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-80 z-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
                                    <span className="text-9xl font-bold text-white italic">{race.round}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 p-4 z-20">
                                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase">Round {race.round}</span>
                                </div>
                            </div>

                            <div className="p-6 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white italic leading-none mb-1">{race.country}</h3>
                                        <p className="text-slate-400 text-sm uppercase font-bold">{race.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-red-500 font-bold">{new Date(race.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                        <p className="text-slate-600 text-xs uppercase">{new Date(race.date).getFullYear()}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1 h-4 bg-red-600 inline-block skew-x-[-10deg]"></span>
                                        {race.circuit}
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/races/${race.id}`)}
                                    className="w-full btn-secondary group-hover:bg-red-600 group-hover:border-red-600 group-hover:translate-x-1 transition-all"
                                >
                                    Race Data Analysis
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
