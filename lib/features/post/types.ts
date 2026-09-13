import { User } from "../auth/types";

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    image: string;
    isPublished?: boolean;
    category: string | null;
    categoryId: string | null;
    author: User;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPostsResponse {
    data: Post[];
    total: number;
}

