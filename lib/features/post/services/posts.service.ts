import { api, apiClient } from "@/lib/api/client";
import { GetPostsResponse, Post } from "../types";

export async function getAllPosts(): Promise<GetPostsResponse> {
  const response = await api.get<GetPostsResponse>(`/posts`);
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

export async function deletePostById(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}