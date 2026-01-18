import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const { login, user, isLoading, error } = useContext(AuthContext);

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
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-800/30 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md p-8 space-y-3 z-10">
                <div className="card p-10 border-t-4 border-t-red-600">
                    <h1 className="text-4xl font-bold text-center mb-2 text-white italic tracking-tighter">F1 <span className="text-red-600">HUB</span></h1>
                    <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-widest">Fan Access Portal</p>

                    {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="input-field"
                                placeholder="driver@f1.com"
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
                        <button
                            type="submit"
                            className="w-full btn-primary mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Igniting Engine...' : 'Enter Paddock'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">New Rookie? <a href="/register" className="text-red-500 hover:text-red-400 font-bold transition-colors">Get Superlicense</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
