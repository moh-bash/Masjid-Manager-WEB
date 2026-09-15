import { api, apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/lib/types";
import { Post } from "../types";

export async function getAllPosts(page?: number): Promise<PaginatedResponse<Post>> {
  const endpoint = page === undefined ? "/posts" : `/posts?page=${page}&limit=10`;
  const response = await api.get<PaginatedResponse<Post>>(endpoint);
  return response.data;
}

export async function getPostsForAdmin(page?: number): Promise<PaginatedResponse<Post>> {
  const endpoint = page === undefined ? "/posts/admin" : `/posts/admin?page=${page}&limit=10`;
  const response = await apiClient.get<PaginatedResponse<Post>>(endpoint);
  return response.data;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const response = await api.get<Post>(`/posts/${slug}`);
  return response.data;
}

export async function createPost(formData: FormData): Promise<Post> {
  const response = await apiClient.post<Post>(`/posts`, formData);
  return response.data;
}

export async function updatePostById(id: string, formData: FormData): Promise<Post> {
  const response = await apiClient.patch<Post>(`/posts/${id}`, formData);
  return response.data;
}

export async function   deletePostById(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}