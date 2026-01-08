import React from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-cream selection:bg-sepia selection:text-charcoal">
            <Navbar />
            <main className="container mx-auto px-4 pb-20 max-w-4xl">
                {children}
            </main>
            <footer className="py-8 text-center text-sm text-gray-500 font-mono border-t border-sepia mt-12 bg-cream">
                <p>© {new Date().getFullYear()} The Chronicles. All rights reserved.</p>
            </footer>
        </div>
    );
};
