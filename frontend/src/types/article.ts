export interface Article {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface CreateArticleDto {
    title: string;
    content: string;
}

export interface UpdateArticleDto {
    title?: string;
    content?: string;
}
