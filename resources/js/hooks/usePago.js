import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function usePago() {
    const { data, error, isLoading, mutate } = useSWR("/api/pagos", fetcher, {
        refreshInterval: 1000,
    });

    const pagos = data?.data ?? [];

    const createPago = async (datos) => {
        try {
            const response = await api.post("/api/pagos", datos);

            await mutate();
            return response.data;
        } catch (error) {
            throw error.response || error;
        }
    };

    const deletePago = async (id) => {
        try {
            const response = await api.delete(`/api/pagos/${id}`);
            await mutate();
            return response.data;
        } catch (error) {
            throw error.response || error;
        }
    };

    return {
        pagos,
        isLoading,
        error,
        createPago,
        deletePago,
        mutate,
    };
}
