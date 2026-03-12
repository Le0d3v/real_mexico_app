import { driver } from "driver.js";
import useIRM from "./useIRM";

export default function useAdminTour() {
    const { setAdminPage, setTitulo } = useIRM();

    const startTour = () => {
        setAdminPage(0);
        setTitulo("Instituto Real de México A.C.");
        const driverObj = driver({
            showProgress: true,
            allowClose: true,
            steps: [
                {
                    element: "#start",
                    popover: {
                        title: "¡Bienvenido al Tour por la Aplicación!",
                        description:
                            'Este recorrido guiado le mostrará la estructura del sistema y el funcionamiento de sus principales herramientas. Utilice los botones ubicados en la parte inferior del panel o las teclas "<" y ">" de su teclado para avanzar o retroceder entre los pasos. Si desea finalizar el tour en cualquier momento, puede hacerlo presionando el botón «X» en la esquina superior derecha del cuadro o utilizando la tecla «ESC». Iniciemos el recorrido para conocer cada sección del sistema.',
                        side: "top",
                    },
                },
                {
                    element: "#driver_cerrar-sesion",
                    popover: {
                        title: "Cerrar Sesión",
                        description:
                            "Este botón permite finalizar su sesión actual de forma segura. Al utilizarlo, el sistema cerrará su acceso y lo redirigirá nuevamente a la sección pública de la aplicación.",
                        side: "top",
                    },
                },
                {
                    element: "#driver_navegacion",
                    popover: {
                        title: "Navegación",
                        description:
                            "Este panel contiene el menú principal de navegación del sistema. A través de él podrá acceder rápidamente a cada una de las secciones administrativas disponibles.",
                    },
                },
                {
                    element: "#driver_navegacion-enlaces > :nth-child(1)",
                    popover: {
                        title: "Enlace",
                        description:
                            "Cada elemento del menú corresponde a una sección del sistema. Haga clic sobre cualquiera de estos enlaces para desplazarse directamente a la sección correspondiente.",
                    },
                },
                {
                    element: "#driver_main",
                    popover: {
                        title: "Contenido",
                        description:
                            "En esta área se mostrará el contenido principal de cada sección que seleccione desde el menú de navegación. Actualmente se encuentra visualizando la sección de Inicio.",
                    },
                },
                {
                    element: "#driver_kpis",
                    popover: {
                        title: "Información General",
                        description:
                            "Al iniciar sesión, el sistema presenta indicadores clave que resumen el estado general de la plataforma. Aquí podrá consultar rápidamente datos como el total de alumnos registrados, tutores, pagos realizados y los montos pendientes correspondientes al mes actual.",
                    },
                },
                {
                    element: "#driver_estado-financiero",
                    popover: {
                        title: "Estado Financiero del Mes",
                        description:
                            "Este indicador muestra el progreso de los ingresos registrados durante el mes actual. La barra de avance se actualiza automáticamente cada vez que se registra un pago o cuando comienza un nuevo periodo mensual.",
                    },
                },
                {
                    element: "#driver_grafico-alumnos",
                    popover: {
                        title: "Alumnos por Nivel",
                        description:
                            "Este gráfico presenta una distribución visual de los alumnos registrados en el sistema según su nivel o grado académico. La información se actualiza automáticamente cuando se agregan, modifican o eliminan registros de estudiantes.",
                    },
                },
                {
                    element: "#driver_accesos-rapidos",
                    popover: {
                        title: "Accesos Rápidos",
                        description:
                            "Los accesos rápidos permiten ejecutar las acciones más comunes del sistema sin necesidad de navegar entre diferentes secciones. Desde aquí puede registrar nuevos estudiantes, tutores, pagos o publicaciones de forma directa.",
                        onNextClick: () => {
                            setAdminPage(4);
                            setTitulo("Tutores");
                            setTimeout(() => {
                                driverObj.moveNext();
                            }, 500);
                        },
                    },
                },
                {
                    element: "#driver_main",
                    popover: {
                        title: "Tutores",
                        description:
                            "En esta sección podrá administrar toda la información relacionada con los tutores registrados en el sistema, así como las relaciones que mantienen con los alumnos.",
                    },
                },
                {
                    element: "#driver_tutores-total",
                    popover: {
                        title: "Tutores Totales",
                        description:
                            "Este indicador muestra en tiempo real el número total de tutores registrados actualmente en la base de datos.",
                    },
                },
                {
                    element: "#driver_tutores-crear",
                    popover: {
                        title: "Registrar Nuevo Tutor",
                        description:
                            "Utilice este botón para abrir el formulario de registro y agregar un nuevo tutor al sistema.",
                    },
                },
                {
                    element: "#driver_tutores-buscar",
                    popover: {
                        title: "Buscar un Tutor",
                        description:
                            "Este campo permite localizar rápidamente un tutor específico introduciendo datos como su nombre, apellidos, correo electrónico o número de teléfono.",
                    },
                },
                {
                    element: "#driver_tutores-filtro",
                    popover: {
                        title: "Filtro",
                        description:
                            "El sistema permite ordenar los registros utilizando este filtro. Puede visualizar los datos de forma ascendente o descendente según el criterio seleccionado.",
                    },
                },
                {
                    element: "#driver_tutores-tabla",
                    popover: {
                        title: "Registros",
                        description:
                            "En esta tabla se muestran todos los tutores registrados en el sistema. El contenido se actualizará dinámicamente cuando utilice el buscador, los filtros o la paginación.",
                    },
                },
                {
                    element: "#driver_tutores-registros > :nth-child(1)",
                    popover: {
                        title: "Tutor",
                        description:
                            "Cada fila representa un tutor registrado. Aquí se muestran sus datos principales para facilitar la consulta rápida de información.",
                    },
                },
                {
                    element:
                        "#driver_tutores-registros > :nth-child(1) .show-tutor",
                    popover: {
                        title: "Ver Más Datos",
                        description:
                            "Este botón permite abrir una vista detallada con toda la información asociada al tutor seleccionado.",
                    },
                },
                {
                    element: "#driver_tutores-paginacion",
                    popover: {
                        title: "Paginación",
                        description:
                            "Cuando el número de registros es elevado, el sistema divide los datos en varias páginas. Utilice estos controles para navegar entre ellas y visualizar más resultados.",
                        onNextClick: () => {
                            setAdminPage(5);
                            setTitulo("Publicaciones");
                            setTimeout(() => {
                                driverObj.moveNext();
                            }, 500);
                        },
                    },
                },
                {
                    element: "#driver_main",
                    popover: {
                        title: "Publicaciones",
                        description:
                            "En esta sección se gestionan todas las publicaciones que aparecerán en el apartado público de eventos y noticias del sistema.",
                    },
                },
                {
                    element: "#driver_posts-total",
                    popover: {
                        title: "Publicaciones Totales",
                        description:
                            "Este indicador muestra el número total de publicaciones registradas actualmente en el sistema.",
                    },
                },
                {
                    element: "#driver_posts-buscador",
                    popover: {
                        title: "Buscar Publicación",
                        description:
                            "Utilice este campo para localizar rápidamente una publicación introduciendo palabras clave del título o parte de su contenido.",
                    },
                },
                {
                    element: "#driver_posts-filtro",
                    popover: {
                        title: "Filtrar Publicaciones",
                        description:
                            "Este filtro permite ordenar las publicaciones según su fecha de creación, mostrando primero las más recientes o las más antiguas.",
                    },
                },
                {
                    element: "#driver_posts-crear",
                    popover: {
                        title: "Crear una Publicación",
                        description:
                            "Presione este botón para abrir el formulario que le permitirá crear y publicar una nueva noticia o evento.",
                    },
                },
                {
                    element: "#driver_posts-listado",
                    popover: {
                        title: "Listado de Publicaciones",
                        description:
                            "En esta área se mostrarán todas las publicaciones registradas. Si no existen registros, el sistema mostrará un mensaje indicando que no hay contenido disponible.",
                    },
                },
                {
                    element: "#driver_posts-listado > :nth-child(1)",
                    popover: {
                        title: "Publicación",
                        description:
                            "Cada publicación se presenta como una tarjeta informativa que incluye su imagen representativa, título, fecha de publicación, descripción y las acciones disponibles.",
                    },
                },
                {
                    element: "#driver_posts-listado > :nth-child(1) .post-edit",
                    popover: {
                        title: "Editar Publicación",
                        description:
                            "Utilice este botón para modificar el contenido de una publicación existente y actualizar su información.",
                    },
                },
                {
                    element:
                        "#driver_posts-listado > :nth-child(1) .post-delete",
                    popover: {
                        title: "Eliminar Publicación",
                        description:
                            "Este botón permite eliminar permanentemente la publicación seleccionada. El sistema solicitará una confirmación antes de ejecutar la eliminación.",
                        onNextClick: () => {
                            setAdminPage(6);

                            setTimeout(() => {
                                driverObj.moveNext();
                            }, 500);
                        },
                    },
                },
                {
                    element: "#driver_main",
                    popover: {
                        title: "Configuración",
                        description:
                            "En esta sección podrá administrar la configuración de su cuenta, actualizar sus datos personales y ejecutar nuevamente el tour de la aplicación cuando lo necesite.",
                    },
                },
                {
                    element: "#driver_settings-personal",
                    popover: {
                        title: "Datos Personales",
                        description:
                            "Aquí se muestran los datos personales asociados a su cuenta de usuario. Puede modificarlos en caso de ser necesario.",
                    },
                },
                {
                    element: "#driver_settings-personal-save",
                    popover: {
                        title: "Guardar Cambios",
                        description:
                            "Después de realizar modificaciones en su información personal, utilice este botón para guardar los cambios en el sistema.",
                    },
                },
                {
                    element: "#driver_settings-domicilio",
                    popover: {
                        title: "Datos de Domicilio",
                        description:
                            "En esta sección podrá consultar y actualizar la información relacionada con su domicilio.",
                    },
                },
                {
                    element: "#driver_settings-domicilio-save",
                    popover: {
                        title: "Guardar Cambios",
                        description:
                            "Utilice este botón para confirmar y guardar cualquier modificación realizada en los datos de domicilio.",
                    },
                },
                {
                    element: "#driver_settings-password",
                    popover: {
                        title: "Cambiar Contraseña",
                        description:
                            "Este formulario permite actualizar su contraseña de acceso. Para hacerlo, deberá introducir su contraseña actual, establecer una nueva y confirmarla.",
                    },
                },
                {
                    element:
                        "#driver_settings-password #driver_settings-password-campo",
                    popover: {
                        title: "Entrada de Datos",
                        description:
                            "Coloque la información solicitada en cada campo para modificar su contraseña.",
                    },
                },
                {
                    element: "#driver_settings-password .show-password",
                    popover: {
                        title: "Ver Contraseña",
                        description:
                            "Utilice el botón para activar o desactivar la vista del contenido ingresado en el campo. Puede activar o desactivar esta función para cada campo del formulario",
                    },
                },
                {
                    element: "#driver_settings-password-save",
                    popover: {
                        title: "Guardar Cambios",
                        description:
                            "Una vez completado correctamente el formulario, presione este botón para actualizar su contraseña. A partir de ese momento deberá utilizar la nueva contraseña para iniciar sesión.",
                    },
                },
                {
                    element: "#driver_settings-tour",
                    popover: {
                        title: "Tour por la Aplicacion",
                        description:
                            "Esta sección le permite iniciar nuevamente el recorrido guiado del sistema en cualquier momento para recordar el funcionamiento de cada herramienta.",
                    },
                },
                {
                    element: "#driver_settings-tour-start",
                    popover: {
                        title: "Iniciar Tour",
                        description:
                            "Presione este botón para comenzar nuevamente el tour interactivo del sistema.",
                    },
                },
                {
                    element: "#end",
                    popover: {
                        title: "¡Felicidades!",
                        description:
                            "Ha completado el recorrido del sistema. Ahora conoce la estructura general de la plataforma y las herramientas disponibles para la gestión administrativa. Recuerde que puede realizar este tour las veces que lo necesite. Suerte en sus procesos administrativos y que tenga un buen día.",
                    },
                },
            ],
        });

        driverObj.drive();
    };

    return { startTour };
}
