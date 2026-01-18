import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { username, email, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const { register, user, isLoading, error } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await register({ username, email, password });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md p-8 space-y-3 z-10">
                <div className="card p-10 border-t-4 border-t-white">
                    <h1 className="text-3xl font-bold text-center mb-2 text-white italic tracking-tighter">JOIN THE <span className="text-red-600">GRID</span></h1>
                    <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-widest">Create Your Profile</p>

                    {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={onChange}
                                className="input-field"
                                placeholder="MaxV1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="input-field"
                                placeholder="user@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full btn-primary mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Get Superlicense'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">Already on the grid? <a href="/login" className="text-red-500 hover:text-red-400 font-bold transition-colors">Enter Paddock</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
