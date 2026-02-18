import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useTutor() {
    const { data, error, isLoading, mutate } = useSWR("/api/tutores", fetcher, {
        refreshInterval: 1000,
    });

    const tutores = data?.data ?? [];

    return {
        tutores,
        isLoading,
        error,
    };
}
