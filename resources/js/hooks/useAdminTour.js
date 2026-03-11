import { driver } from "driver.js";
import useIRM from "./useIRM";

export default function useAdminTour() {
    const { setAdminPage } = useIRM();

    const startTour = () => {
        setAdminPage(0);
        const driverObj = driver({
            showProgress: true,
            allowClose: true,
            steps: [
                {
                    element: "#driver_welcome",
                    popover: {
                        title: "Bienvenido al Tour por la Aplicación",
                        description:
                            "Complete el tour para conocer el sistema y todas funcionalidades. Puede finalizar el Tour cuando lo desee",
                        side: "top",
                    },
                },
                {
                    element: "#driver_cerrar-sesion",
                    popover: {
                        title: "Cerrar Sesión",
                        description:
                            "Utilice el botón para cerrar la sesión y volver a la sección pública dando click sobre el.",
                        side: "top",
                    },
                },
                {
                    element: "#driver_navegacion",
                    popover: {
                        title: "Navegación",
                        description:
                            "Con ella podrá navegar entre las distintas secciones del sistema",
                    },
                },
                {
                    element: "#driver_enlace",
                    popover: {
                        title: "Enlace",
                        description:
                            "De click al enlace para trasladarse a la sección correspondiente.",
                    },
                },
                {
                    element: "#driver_main",
                    popover: {
                        title: "Contenido",
                        description:
                            "Aquí se visualizará el contenido de cada sección. Actualmente se encunetra en la Sección de Inicio. Exploremos esta sección.",
                    },
                },
                {
                    element: "#driver_kpis",
                    popover: {
                        title: "Información General",
                        description:
                            "Al inciar sesión visualizará información genérica sobre los datos principales del sistmea: Alumnos, Tutores, Pagos, Pendientes ($)",
                    },
                },
                {
                    element: "#driver_estado-financiero",
                    popover: {
                        title: "Estado Financiero del Mes",
                        description:
                            "Visualice el avance de recaudos de cada mes. La barra progresiva y su información se actualizarán automáticamente cuando termine el mes anterior con la información del mes actual, o cuando se registre algun pago o movimiento relacionado al mes actual.",
                    },
                },
                {
                    element: "#driver_grafico-alumnos",
                    popover: {
                        title: "Alumnos por Nivel",
                        description:
                            "Este gráfico muestra la distribución de Alumnos por grado. La gráfica se actualizará automáticamente tras realizar algún cambio relacionado a los estudiantes.",
                    },
                },
                {
                    element: "#driver_accesos-rapidos",
                    popover: {
                        title: "Accesos Rápidos",
                        description:
                            "Realice funciones principales del sistema sin navegar a las secciones correspondientes utilizando los accesos rápidos. Registre un nuevo estudiante, un nuvo tutor, un nuevo pago, o una nueva noticia para ser mostrada en la sección de eventos y noticias en la sección pública. Utilice estos accesos rápidos para evitar navegar a otra sección. Solo si lo desea.",
                    },
                },
                {
                    element: "#driver_colegiaturas",
                    popover: {
                        title: "Colegiaturas",
                        description:
                            "Esta es la sección de Colegiaturas. Aquí gestionará todas las colegiaturas por cada estudiante dentro del ciclo escolar actual. Exploremos esta sección.",
                    },
                },
            ],
        });

        driverObj.drive();
    };

    return { startTour };
}
