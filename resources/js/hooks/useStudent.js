import api from "../config/axios";
import useSWR from "swr";
import { useMemo } from "react";

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

  const updateStudent = async (id, datos) => {
    try {
      const response = await api.put(`/api/estudiantes/${id}`, datos);
      await mutate();
      return response.data;
    } catch (error) {
      throw error.response || error;
    }
  };

  const estudiantesPrimerCiclo = useMemo(() => {
    return estudiantes.filter((e) => [1].includes(Number(e.grado_id)));
  }, [estudiantes]);

  const estudiantesSegundoCiclo = useMemo(() => {
    return estudiantes.filter((e) => [2].includes(Number(e.grado_id)));
  }, [estudiantes]);

  const estudiantesTercerCiclo = useMemo(() => {
    return estudiantes.filter((e) => [3].includes(Number(e.grado_id)));
  }, [estudiantes]);

  const estudiantesCuartoCiclo = useMemo(() => {
    return estudiantes.filter((e) => [4].includes(Number(e.grado_id)));
  }, [estudiantes]);

  const estudiantesQuintoCiclo = useMemo(() => {
    return estudiantes.filter((e) => [5].includes(Number(e.grado_id)));
  }, [estudiantes]);

  const estudiantesSextoCiclo = useMemo(() => {
    return estudiantes.filter((e) => [6].includes(Number(e.grado_id)));
  }, [estudiantes]);

  return {
    estudiantes,
    isLoading,
    error,
    createStudent,
    updateStudent,
    estudiantesPrimerCiclo,
    estudiantesSegundoCiclo,
    estudiantesTercerCiclo,
    estudiantesCuartoCiclo,
    estudiantesQuintoCiclo,
    estudiantesSextoCiclo,
  };
}
