import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { authApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { accessToken } = await authApi.login({ email, password });
            login(accessToken);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-20 p-8 border border-sepia bg-white">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">Admin Access</h2>
                {error && <div className="mb-4 text-red-800 font-mono text-sm text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-mono uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 font-mono focus:border-charcoal focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-mono uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 font-mono focus:border-charcoal focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">Login</Button>
                </form>
            </div>
        </Layout>
    );
};
