import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'text-red-500 font-bold' : 'text-slate-300 hover:text-white';

    return (
        <nav className="glass-nav px-8 py-4 flex justify-between items-center">
            <div
                className="text-2xl font-bold italic tracking-tighter cursor-pointer flex items-center gap-1 text-white hover:scale-105 transition-transform"
                onClick={() => navigate('/dashboard')}
            >
                F1 <span className="text-red-600">HUB</span>
            </div>

            <div className="flex items-center space-x-8 font-orbitron text-sm tracking-wide">
                <button onClick={() => navigate('/dashboard')} className={`${isActive('/dashboard')} transition-colors uppercase`}>Race Control</button>
                <button onClick={() => navigate('/drivers')} className={`${isActive('/drivers')} transition-colors uppercase`}>Drivers</button>
                <button onClick={() => navigate('/forum')} className={`${isActive('/forum')} transition-colors uppercase`}>Paddock Chat</button>
            </div>

            <div className="flex items-center space-x-6">
                <div className="text-right hidden md:block">
                    <span className="block text-xs text-slate-400 uppercase tracking-widest">Logged in as</span>
                    <span className="text-white font-bold">{user && user.username}</span>
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="px-4 py-1.5 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded text-xs font-bold uppercase transition-all"
                >
                    Box Box
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
