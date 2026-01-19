import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2024');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        const fetchDrivers = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${API_URL}/api/drivers?year=${selectedYear}`);
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, [user, navigate, selectedYear]);

    return (
        <div className="min-h-screen pb-20">
            <Navbar />

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-l-4 border-red-600 pl-4">
                    <h2 className="text-4xl font-bold text-white italic">{selectedYear} <span className="text-red-600">GRID</span></h2>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        {['2024', '2025', '2026'].map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-1 rounded font-bold text-sm transition-all skew-x-[-10deg] ${selectedYear === year
                                        ? 'bg-red-600 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="card relative group hover:-translate-y-2">
                            <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-white/5 font-orbitron z-0 select-none">
                                {driver.number}
                            </div>

                            <div className="relative z-10 flex flex-col items-center p-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-slate-700 group-hover:border-red-600 transition-colors shadow-lg">
                                    <img src={driver.image} alt={driver.name} className="w-full h-full object-cover bg-slate-200" />
                                </div>

                                <h3 className="text-2xl font-bold text-white italic text-center">{driver.name}</h3>
                                <p className="text-red-500 font-bold text-sm uppercase tracking-wider mb-6">{driver.team}</p>

                                <div className="w-full grid grid-cols-2 gap-4 text-center bg-slate-900/50 rounded-lg p-3">
                                    <div>
                                        <span className="block text-xl font-bold text-white font-orbitron">{driver.number}</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Car No.</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-white font-orbitron">{driver.points}</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">PTS</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 uppercase">
                                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                                    {driver.country}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Drivers;
