import { api } from './client';
import type { LoginResponse, LoginDto } from '../types';

export const authApi = {
    login: async (credentials: LoginDto) => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },
};
