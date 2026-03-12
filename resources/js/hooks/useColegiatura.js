import api from "../config/axios";
import useSWR from "swr";
import { useMemo } from "react";

const fetcher = (url) => api(url).then((res) => res.data);

export default function useColegiatura() {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/estudiantes",
        fetcher,
    );

    const estudiantes = data?.data ?? [];

    const colegiaturas = useMemo(() => {
        return estudiantes.flatMap((estudiante) =>
            (estudiante.colegiaturas ?? []).map((colegiatura) => ({
                ...colegiatura,

                estudiante: {
                    id: estudiante.id,
                    nombre: estudiante.nombre,
                    apellido_paterno: estudiante.apellido_paterno,
                    apellido_materno: estudiante.apellido_materno,
                    fecha_nacimiento: estudiante.fecha_nacimiento,
                    curp: estudiante.curp,
                    genero: estudiante.genero,
                    matricula: estudiante.matricula,
                    estado: estudiante.estado,
                    tipo_sangre: estudiante.tipo_sangre,
                    entidad_nacimiento: estudiante.entidad_nacimiento,
                    grado: estudiante.grado,
                    grado_id: estudiante.grado_id,
                    grupo: estudiante.grupo,
                    domicilio: estudiante.domicilio,

                    // agregar tutores completos
                    tutores: (estudiante.tutores ?? []).map((tutor) => ({
                        ...tutor,
                        usuario: {
                            ...tutor.usuario,
                        },
                        relacion: {
                            ...tutor.relacion,
                        },
                    })),
                },
            })),
        );
    }, [estudiantes]);

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
        colegiaturasMesActual,
        isLoading,
        error,
        mutate,
    };
}
