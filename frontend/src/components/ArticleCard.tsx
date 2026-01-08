import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import { formatDate } from '../utils/format';
import { ArrowRight } from 'lucide-react';

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <article className="group mb-12 last:mb-0">
            <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
                <Link to={`/article/${article.id}`}>
                    <h2 className="text-3xl font-serif font-bold group-hover:text-clay transition-colors leading-tight">
                        {article.title}
                    </h2>
                </Link>
                <p className="font-mono text-gray-600 line-clamp-3 my-4 leading-relaxed">
                    {article.content}
                </p>
                <Link to={`/article/${article.id}`} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                    Read Story <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
};
