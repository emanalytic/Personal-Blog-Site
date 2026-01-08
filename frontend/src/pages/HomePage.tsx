import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/ArticleCard';
import { articleApi } from '../api/articles';
import type { Article } from '../types/index';
import { Loader } from 'lucide-react';

export const HomePage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await articleApi.getAll();
                // Sort by newest first
                const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setArticles(sorted);
            } catch (error) {
                console.error('Failed to fetch articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-charcoal" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-clay tracking-tight">
                    Personal Blog 
                </h1>   
                <p className="text-medium text-lg font-mono text-gray-500">
                    A place for your thoughts and ideas.
                </p>
            </header>   

            <div className="max-w-2xl mx-auto">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                ) : (
                    <div className="text-center font-mono text-gray-500 py-12">
                        No articles found. Time to write something new?
                    </div>
                )}
            </div>
        </Layout>
    );
};
