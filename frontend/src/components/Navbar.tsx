import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="py-8 border-b border-sepia mb-12">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-serif font-bold tracking-tighter hover:text-clay transition-colors flex items-center gap-3">
                    <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
                    Chronicles
                </Link>
                <div className="flex gap-6 items-center font-mono text-sm">
                    <Link to="/" className="hover:underline decoration-clay underline-offset-4">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/admin" className="hover:underline decoration-clay underline-offset-4">Admin</Link>
                            <button onClick={logout} className="hover:text-red-800 transition-colors">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 hover:text-clay transition-colors">
                            <PenTool size={16} />
                            <span>Write</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
