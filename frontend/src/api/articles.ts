import { api } from './client';
import type { Article, CreateArticleDto, UpdateArticleDto } from '../types/index';

export const articleApi = {
    getAll: async () => {
        const response = await api.get<Article[]>('/articles');
        return response.data;
    },
    getOne: async (id: number) => {
        const response = await api.get<Article>(`/articles/${id}`);
        return response.data;
    },
    create: async (data: CreateArticleDto) => {
        const response = await api.post<Article>('/articles', data);
        return response.data;
    },
    update: async (id: number, data: UpdateArticleDto) => {
        const response = await api.patch<Article>(`/articles/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/articles/${id}`);
    },
};
