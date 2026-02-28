import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useColegiatura() {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/colegiaturas",
        fetcher,
        {
            refreshInterval: 1000,
        },
    );

    const colegiaturas = data?.data ?? [];

    return {
        colegiaturas,
        isLoading,
        error,
    };
}
