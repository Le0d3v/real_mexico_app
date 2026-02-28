import api from "../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useCicloEscolar() {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/ciclo-actual",
        fetcher,
        {
            refreshInterval: 1000,
        },
    );

    const cicloEscolar = data?.data ?? [];

    return {
        cicloEscolar,
        isLoading,
        error,
    };
}
