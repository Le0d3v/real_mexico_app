import api from "../config/axios";
import useSWR from "swr";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useCicloEscolar() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/ciclo-actual",
    fetcher,
    {
      refreshInterval: 1000,
    },
  );

  const cerrarCiclo = async (payload) => {
    try {
      const response = await api.post("/api/ciclo-escolar/cerrar", payload);

      await mutate();

      return {
        ok: true,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message,
        error: error.response?.data?.error,
      };
    }
  };

  const cicloEscolar = data?.data[0] ?? null;

  return {
    cicloEscolar,
    isLoading,
    error,
    cerrarCiclo,
  };
}
