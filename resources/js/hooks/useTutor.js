import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useTutor() {
    const { data, error, isLoading, mutate } = useSWR("/api/tutores", fetcher, {
        refreshInterval: 1000,
    });

    const tutores = data?.data ?? [];

    const createTutor = async (datos) => {
        try {
            const response = await api.post("/api/tutores", datos);

            await mutate();
            return response.data;
        } catch (error) {
            throw error.response || error;
        }
    };

    const deleteTutor = async (id) => {
        try {
            const response = await api.delete(`/api/tutores/${id}`);
            await mutate();
            return response.data;
        } catch (error) {
            throw error.response || error;
        }
    };

    return {
        tutores,
        isLoading,
        error,
        createTutor,
        deleteTutor,
    };
}
