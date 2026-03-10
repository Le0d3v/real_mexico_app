import api from "../config/axios";
import useSWR from "swr";
import { useMemo } from "react";

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

    const colegiaturasMesActual = useMemo(() => {
        const now = new Date();

        const mesActual = new Intl.DateTimeFormat("es-MX", {
            month: "long",
        })
            .format(now)
            .toLowerCase();

        const anioActual = now.getFullYear();

        return colegiaturas.filter((c) => {
            return (
                c.mes?.toLowerCase() === mesActual &&
                Number(c.anio) === anioActual
            );
        });
    }, [colegiaturas]);

    return {
        colegiaturas,
        isLoading,
        error,
        colegiaturasMesActual,
    };
}
