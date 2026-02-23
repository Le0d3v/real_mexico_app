import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useStudent() {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/estudiantes",
        fetcher,
        {
            refreshInterval: 1000,
        },
    );

    const estudiantes = data?.data ?? [];

    const createStudent = async (datos) => {
        try {
            const response = await api.post("/api/estudiantes", datos);
            await mutate();
            return response.data;
        } catch (error) {
            throw error.response || error;
        }
    };

    return {
        estudiantes,
        isLoading,
        error,
        createStudent,
    };
}
