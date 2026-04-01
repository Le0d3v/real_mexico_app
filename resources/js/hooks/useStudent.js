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
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 1 && e.estado === "Activo",
    );
  }, [estudiantes]);

  const estudiantesSegundoCiclo = useMemo(() => {
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 2 && e.estado === "Activo",
    );
  }, [estudiantes]);

  const estudiantesTercerCiclo = useMemo(() => {
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 3 && e.estado === "Activo",
    );
  }, [estudiantes]);

  const estudiantesCuartoCiclo = useMemo(() => {
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 4 && e.estado === "Activo",
    );
  }, [estudiantes]);

  const estudiantesQuintoCiclo = useMemo(() => {
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 5 && e.estado === "Activo",
    );
  }, [estudiantes]);

  const estudiantesSextoCiclo = useMemo(() => {
    return estudiantes.filter(
      (e) => Number(e.grado_id) === 6 && e.estado === "Activo",
    );
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
