import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { articleApi } from '../api/articles';
import type { Article } from '../types/index';
import { formatDate } from '../utils/format';
import { Loader, ArrowLeft } from 'lucide-react';

export const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchArticle = async () => {
            try {
                const data = await articleApi.getOne(+id);
                setArticle(data);
            } catch (error) {
                console.error('Failed to fetch article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-charcoal" />
                </div>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout>
                <div className="text-center py-20 font-mono">
                    <h2 className="text-2xl mb-4">Article Not Found</h2>
                    <Link to="/" className="text-clay hover:underline">Return Home</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-gray-500 hover:text-charcoal mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to Home
            </Link>
            <article>
                <header className="mb-12 text-center">
                    <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">
                        {formatDate(article.createdAt)}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal leading-tight">
                        {article.title}
                    </h1>
                </header>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:font-mono prose-p:text-gray-700 prose-a:text-clay hover:prose-a:text-charcoal max-w-none mx-auto whitespace-pre-wrap">
                    {article.content}
                </div>
            </article>
        </Layout>
    );
};
