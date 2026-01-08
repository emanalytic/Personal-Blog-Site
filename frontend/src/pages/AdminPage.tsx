import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { articleApi } from '../api/articles';
import type { Article } from '../types/index';
import { Trash2, Edit2, Plus, X } from 'lucide-react';
import { formatDate } from '../utils/format';

export const AdminPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});

    const fetchArticles = async () => {
        const data = await articleApi.getAll();
        setArticles(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            await articleApi.delete(id);
            fetchArticles();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentArticle.title || !currentArticle.content) return;

        if (currentArticle.id) {
            await articleApi.update(currentArticle.id, {
                title: currentArticle.title,
                content: currentArticle.content
            });
        } else {
            await articleApi.create({
                title: currentArticle.title,
                content: currentArticle.content
            });
        }

        setIsEditing(false);
        setCurrentArticle({});
        fetchArticles();
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-serif font-bold">Dashboard</h1>
                <Button onClick={() => { setIsEditing(true); setCurrentArticle({}); }}>
                    <span className="flex items-center gap-2"><Plus size={18} /> New Article</span>
                </Button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-cream w-full max-w-2xl p-8 border border-charcoal shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold">{currentArticle.id ? 'Edit Article' : 'New Article'}</h2>
                            <button onClick={() => setIsEditing(false)} className="hover:text-red-800"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div>
                                <label className="block font-mono text-sm uppercase tracking-wider mb-2">Title</label>
                                <input
                                    value={currentArticle.title || ''}
                                    onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                    className="w-full p-3 border border-gray-300 font-serif text-lg focus:border-charcoal focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-sm uppercase tracking-wider mb-2">Content</label>
                                <textarea
                                    value={currentArticle.content || ''}
                                    onChange={e => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                    className="w-full p-3 border border-gray-300 font-mono h-64 resize-none focus:border-charcoal focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit">Save Article</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {articles.map(article => (
                    <div key={article.id} className="flex justify-between items-start border-b border-gray-200 pb-6 last:border-0 hover:bg-white p-4 -mx-4 transition-colors rounded-lg">
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-1">{article.title}</h3>
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setCurrentArticle(article); setIsEditing(true); }}
                                className="p-2 hover:bg-sepia rounded-full transition-colors text-charcoal"
                                title="Edit"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(article.id)}
                                className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-800"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};
