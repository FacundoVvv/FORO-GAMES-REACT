import { Post } from "@Types/Forum/Post";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (section: string): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/forum/posts/get-posts/${section}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener posts");
  const data = await response.json();
  return data.posts;
};

export const createPost = async (
  section: string,
  title: string,
  description: string,
  authorId: string
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/forum/posts/create-post/${section}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, description, author: authorId }),
  });
  if (!response.ok) throw new Error("Error al crear post");
  const data = await response.json();
  return data.post;
};

export const reactPost = async (
  postId: string,
  reactionId: string,
  userId: string
): Promise<{ ok: boolean; status: number; message?: string }> => {
  const response = await fetch(`${BASE_URL}/forum/posts/react-post/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ react_id: reactionId, user_id: userId }),
  });
  const data = await response.json();
  return { ok: response.ok, status: response.status, message: data?.message };
};