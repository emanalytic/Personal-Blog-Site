import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            className={twMerge(
                clsx(
                    'px-6 py-2 transition-all duration-300 font-serif font-bold tracking-wide border',
                    {
                        'bg-charcoal text-cream border-charcoal hover:bg-transparent hover:text-charcoal': variant === 'primary',
                        'bg-transparent text-charcoal border-charcoal hover:bg-sepia': variant === 'secondary',
                        'bg-red-800 text-white border-red-800 hover:bg-transparent hover:text-red-800': variant === 'danger',
                    },
                    className
                )
            )}
            {...props}
        >
            {children}
        </button>
    );
};
