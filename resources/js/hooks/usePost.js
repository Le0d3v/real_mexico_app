import useSWR from "swr";
import api from "../config/axios";

const fetcher = (url) => api(url).then((res) => res.data);

export default function usePosts() {
  const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher, {
    refreshInterval: 1000,
  });

  const posts = data?.data ?? [];

  const createPost = async (formData) => {
    try {
      const response = await api.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await mutate();
      return response.data;
    } catch (error) {
      throw error.response || error;
    }
  };

  const updatePost = async (id, formData) => {
    try {
      formData.append("_method", "PUT");

      const response = await api.post(`/api/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await mutate();
      return response.data;
    } catch (error) {
      throw error.response || error;
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await api.delete(`/api/posts/${id}`);
      await mutate();
      return response.data;
    } catch (error) {
      throw error.response || error;
    }
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
}
