import { driver } from "driver.js";
import useIRM from "./useIRM";

export default function useAdminTour() {
  const { setAdminPage, setTitulo, setTutorPage } = useIRM();

  const startTour = () => {
    setAdminPage(0);
    setTitulo("Instituto Real de México A.C.");
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      popover: {
        nextBtnText: "Siguiente",
        prevBtnText: "Anterior",
        doneBtnText: "Finalizar",
        closeBtnText: "Cerrar",
        progressText: "{{current}} de {{total}}",
      },
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
          element: "#driver_ocultar-navegacion",
          popover: {
            title: "Ocultar Navegación",
            description:
              "Puede mostrar y ocultar la nevagción las veces que lo necesite usando este botón. Con ello puede visualizar mejor el contenido aprovechando el espacio utilizado por la barra lateral.",
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
              setAdminPage(1);
              setTitulo("Colegiaturas");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Colegiaturas",
            description:
              "En esta sección podrá administrar todas las colegiaturas registradas en el sistema. Aquí encontrará las herramientas necesarias para consultar, filtrar y gestionar los pagos correspondientes a cada alumno.",
            onPrevClick: () => {
              setAdminPage(0);
              setTitulo("Instituto Real de México A.C.");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_colegiaturas-resumen",
          popover: {
            title: "Resumen",
            description:
              "Este panel muestra un resumen general de las colegiaturas en tiempo real. Aquí podrá visualizar el total recaudado, los montos pendientes de pago y las colegiaturas que se encuentran vencidas.",
          },
        },
        {
          element: "#driver_colegiaturas-filtros",
          popover: {
            title: "Acciones para Regitros",
            description:
              "Utilice los filtros para localizar información de forma más precisa. Al aplicar un filtro, los datos mostrados en los indicadores y en la tabla se actualizarán automáticamente según los criterios seleccionados. o exporte datos a archivos Excel para la creación de reportes.",
          },
        },
        {
          element: "#driver_colegiaturas-buscador",
          popover: {
            title: "Buscar una Colegiatura",
            description:
              "Utilice este buscador para localizar una colegiatura específica mediante los datos del alumno, como nombre, apellidos o matrícula.",
          },
        },
        {
          element: "#driver_colegiaturas-estados",
          popover: {
            title: "Filtrar por Estado",
            description:
              "Permite filtrar las colegiaturas según su estado actual. Puede visualizar únicamente las colegiaturas pendientes, pagadas o vencidas para obtener un análisis más preciso.",
          },
        },
        {
          element: "#driver_colegiaturas-mes",
          popover: {
            title: "Filtrar por Mes",
            description:
              "Utilice este filtro para visualizar las colegiaturas correspondientes a un mes específico. De forma predeterminada, el sistema mostrará los registros del mes actual.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_colegiaturas-tabla",
          popover: {
            title: "Registros",
            description:
              "En esta tabla se muestran todos los registros de colegiaturas disponibles en la base de datos. La información se actualizará automáticamente cuando se utilicen los filtros o el buscador.",
          },
        },
        {
          element: "#driver_colegiaturas-registros > :nth-child(1)",
          popover: {
            title: "Colegiatura",
            description:
              "Cada fila representa una colegiatura registrada en el sistema. Aquí podrá visualizar de forma rápida los datos principales relacionados con el pago correspondiente.",
          },
        },
        {
          element:
            "#driver_colegiaturas-registros > :nth-child(1) .registrar-pago",
          popover: {
            title: "Registrar Pago",
            description:
              "Utilice este botón para registrar el pago de la colegiatura seleccionada. El sistema asociará automáticamente el pago con el alumno correspondiente.",
          },
        },
        {
          element: "#driver_colegiaturas-registros > :nth-child(1) .historial",
          popover: {
            title: "Historial",
            description:
              "Este botón le permitirá acceder al historial completo de colegiaturas del alumno, donde podrá consultar el estado y registro de cada pago realizado.",
          },
        },
        {
          element: "#driver_colegiaturas-paginacion",
          popover: {
            title: "Paginación",
            description:
              "Cuando la cantidad de registros es elevada, el sistema divide la información en varias páginas para facilitar su visualización. Utilice estos controles para navegar entre ellas.",
          },
        },
        {
          element: "#driver_paginacion-numero",
          popover: {
            title: "Número de Página",
            description:
              "Indica el número de la página de registros que está visualizando actualmente.",
          },
        },
        {
          element: "#driver_paginacion-anterior",
          popover: {
            title: "Página Anterior",
            description:
              "Utilice este botón para regresar a la página anterior de registros. Si se encuentra en la primera página, el botón aparecerá deshabilitado.",
          },
        },
        {
          element: "#driver_paginacion-siguiente",
          popover: {
            title: "Página Siguiente",
            description:
              "Utilice este botón para avanzar a la siguiente página de registros. Si se encuentra en la última página, el botón aparecerá deshabilitado.",
          },
        },
        {
          element: "#driver_paginacion-botones .boton-paginacion",
          popover: {
            title: "Página Específica",
            description:
              "También puede acceder directamente a una página específica seleccionando su número. El botón correspondiente se resaltará cuando represente la página actual.",
            onNextClick: () => {
              setAdminPage(2);
              setTitulo("Pagos");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Pagos",
            description:
              "En esta sección podrá consultar y administrar todos los movimientos monetarios registrados en el sistema. Aquí se concentran los registros de pagos realizados por los alumnos.",
            onPrevClick: () => {
              setAdminPage(1);
              setTitulo("Colegiaturas");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_pagos-crear",
          popover: {
            title: "Registrar un Nuevo Pago",
            description:
              "Utilice este botón para registrar un nuevo pago manualmente. A diferencia del registro desde la sección de colegiaturas, aquí deberá seleccionar explícitamente al alumno y la colegiatura correspondiente antes de confirmar el pago.",
          },
        },
        {
          element: "#driver_pagos-indicadores",
          popover: {
            title: "Indicadores",
            description:
              "Este panel muestra indicadores generales sobre los pagos registrados en el sistema. Aquí podrá visualizar el monto total recaudado, el número total de pagos registrados y el promedio de ingresos por pago.",
          },
        },
        {
          element: "#driver_pagos-filtros",
          popover: {
            title: "Filtros",
            description:
              "Utilice estos filtros para localizar registros de pagos de forma más precisa según diferentes criterios disponibles en el sistema.",
          },
        },
        {
          element: "#driver_pagos-buscador",
          popover: {
            title: "Buscar un Pago",
            description:
              "El buscador permite localizar pagos específicos utilizando el nombre del tutor asociado al pago o la referencia del pago, en caso de que exista.",
          },
        },
        {
          element: "#driver_pagos-metodos",
          popover: {
            title: "Filtrar por Método de Pago",
            description:
              "Este filtro permite mostrar únicamente los pagos registrados con un método de pago específico, facilitando la consulta y el análisis de los registros.",
          },
        },
        {
          element: "#driver_pagos-fecha",
          popover: {
            title: "Filtrar por Fecha de Registro",
            description:
              "También puede filtrar los pagos según la fecha en que fueron registrados. El campo abrirá un calendario interactivo que le permitirá seleccionar la fecha deseada.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_pagos-tabla",
          popover: {
            title: "Registros",
            description:
              "En esta tabla se muestran todos los pagos registrados en la base de datos junto con su información general. Los resultados se actualizarán automáticamente al utilizar el buscador o aplicar filtros.",
          },
        },
        {
          element: "#driver_pagos-registros > :nth-child(1)",
          popover: {
            title: "Pago",
            description:
              "Cada fila representa un pago registrado en el sistema, mostrando su información principal junto con las acciones disponibles para consultarlo.",
          },
        },
        {
          element: "#driver_pagos-registros > :nth-child(1) .show-pago",
          popover: {
            title: "Ver Más",
            description:
              "Este botón permite acceder al detalle completo del pago, incluyendo la información del responsable, el servicio asociado y los datos del alumno relacionado.",
          },
        },
        {
          element: "#driver_pagos-paginación",
          popover: {
            title: "Paginación",
            description:
              "Cuando el número de registros es elevado, el sistema divide los resultados en varias páginas para facilitar su visualización. Puede utilizar estos controles para navegar entre los diferentes grupos de registros.",
            onNextClick: () => {
              setAdminPage(3);
              setTitulo("Estudiantes");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Estudiantes",
            description:
              "En esta sección podrá administrar toda la información relacionada con los estudiantes registrados en el sistema, incluyendo sus datos generales y su relación con los tutores correspondientes.",
            onPrevClick: () => {
              setAdminPage(2);
              setTitulo("Pagos");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_estudiantes-total",
          popover: {
            title: "Estudiantes Totales",
            description:
              "Aquí se muestra en tiempo real el número total de estudiantes registrados actualmente en el sistema.",
          },
        },
        {
          element: "#driver_estudiantes-crear",
          popover: {
            title: "Nuevo Estudiante",
            description:
              "Utilice este botón para registrar un nuevo estudiante en la plataforma, ingresando la información necesaria para su identificación y gestión académica.",
          },
        },
        {
          element: "#driver_estudiantes-buscador",
          popover: {
            title: "Buscar Estudiante",
            description:
              "Localice rápidamente un estudiante utilizando su nombre, apellidos o matrícula dentro del sistema.",
          },
        },
        {
          element: "#driver_estudiantes-grado",
          popover: {
            title: "Filtrar por Grado",
            description:
              "Este filtro permite visualizar únicamente a los estudiantes que pertenecen a un grado académico específico.",
          },
        },
        {
          element: "#driver_estudiantes-estado",
          popover: {
            title: "Filtrar por Estado",
            description:
              "Filtre los estudiantes según su estado académico dentro de la institución, como activo, baja temporal o egresado.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_estudiantes-tabla",
          popover: {
            title: "Alumnos",
            description:
              "En esta tabla se muestran todos los estudiantes registrados en el sistema junto con su información general.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1)",
          popover: {
            title: "Alumno",
            description:
              "Cada fila representa a un estudiante y muestra su información principal para facilitar la consulta rápida de sus datos.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1) .perfil",
          popover: {
            title: "Perfil del Alumno",
            description:
              "Al acceder al perfil del estudiante podrá consultar toda la información detallada relacionada con él, incluyendo información sobre su tutor.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1) .editar",
          popover: {
            title: "Editar Información del Alumno",
            description:
              "Si necesita corregir o actualizar algún dato del estudiante, utilice este botón para modificar su información registrada en el sistema.",
          },
        },
        {
          element: "#driver_estudiantes-paginacion",
          popover: {
            title: "Paginación",
            description:
              "Cuando el número de estudiantes es elevado, el sistema divide los registros en varias páginas para facilitar su visualización. Utilice estos controles para navegar entre las diferentes páginas de resultados.",
            onNextClick: () => {
              setAdminPage(4);
              setTitulo("Tutores");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Tutores",
            description:
              "En esta sección podrá administrar toda la información relacionada con los tutores registrados en el sistema, así como las relaciones que mantienen con los alumnos.",
            onPrevClick: () => {
              setAdminPage(3);
              setTitulo("Estudiantes");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
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
          element: "#driver_tutores-registros > :nth-child(1) .show-tutor",
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
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Publicaciones",
            description:
              "En esta sección se gestionan todas las publicaciones que aparecerán en el apartado público de eventos y noticias del sistema.",
            onPrevClick: () => {
              setAdminPage(4);
              setTitulo("Tutores");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_posts-listado > :nth-child(1) .post-delete",
          popover: {
            title: "Eliminar Publicación",
            description:
              "Este botón permite eliminar permanentemente la publicación seleccionada. El sistema solicitará una confirmación antes de ejecutar la eliminación.",
            onNextClick: () => {
              setAdminPage(6);

              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Configuración",
            description:
              "En esta sección podrá administrar la configuración de su cuenta, actualizar sus datos personales y ejecutar nuevamente el tour de la aplicación cuando lo necesite.",
            onPrevClick: () => {
              setAdminPage(5);
              setTitulo("Publicaciones");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_settings-password #driver_settings-password-campo",
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
          element: "#driver_cierre-ciclo",
          popover: {
            title: "Cierre de Ciclo Escolar",
            description:
              "En esta sección se ejecuta el proceso de cierre del ciclo escolar actual. Al realizar esta acción, el sistema desactiva el ciclo vigente, crea uno nuevo, promueve automáticamente a los alumnos al siguiente grado, egresa a los de último nivel y genera las colegiaturas correspondientes al nuevo ciclo. Este procedimiento es crítico y afecta toda la operación académica y financiera.",
          },
        },
        {
          element: "#driver_cierre-ciclo-btn",
          popover: {
            title: "Ejecutar cierre de ciclo",
            description:
              "Presione este botón para iniciar el cierre del ciclo escolar. Antes de continuar, el sistema solicitará una confirmación para evitar ejecuciones accidentales. Una vez confirmado, el proceso se ejecutará de forma automática y no podrá revertirse.",
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

  const startTutorTour = () => {
    setTutorPage(0);
    setTitulo("Instituto Real de México A.C.");
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      popover: {
        nextBtnText: "Siguiente",
        prevBtnText: "Anterior",
        doneBtnText: "Finalizar",
        closeBtnText: "Cerrar",
        progressText: "{{current}} de {{total}}",
      },
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
          element: "#driver_ocultar-navegacion",
          popover: {
            title: "Ocultar Navegación",
            description:
              "Puede mostrar y ocultar la nevagción las veces que lo necesite usando este botón. Con ello puede visualizar mejor el contenido aprovechando el espacio utilizado por la barra lateral.",
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
          element: "#driver_main-kpis",
          popover: {
            title: "Información General",
            description:
              "Visualice Información General relacionada con su rol como tutor dentro de la plataforma. Aquí encontrará datos relevantes sobre sus estudiantes y pagos correspondientes.",
          },
        },
        {
          element: "#driver_tutor-estudiantes",
          popover: {
            title: "Estudiantes a Cargo",
            description:
              "Visualice la lista de estudiantes a su cargo de forma resumida.",
          },
        },
        {
          element: "#driver_main-pagos",
          popover: {
            title: "Ultimos Pagos",
            description:
              "Visualice la lista de los ultimos pagos que ha realizado.",
          },
        },

        {
          element: "#driver_accesos-rapidos",
          popover: {
            title: "Accesos Rápidos",
            description:
              "Los accesos rápidos permiten ejecutar las acciones más comunes del sistema sin necesidad de navegar entre diferentes secciones.",
            onNextClick: () => {
              setAdminPage(1);
              setTitulo("Colegiaturas");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Colegiaturas",
            description:
              "En esta sección podrá administrar todas las colegiaturas registradas en el sistema. Aquí encontrará las herramientas necesarias para consultar, filtrar y gestionar los pagos correspondientes a cada alumno.",
            onPrevClick: () => {
              setAdminPage(0);
              setTitulo("Instituto Real de México A.C.");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_colegiaturas-resumen",
          popover: {
            title: "Resumen",
            description:
              "Este panel muestra un resumen general de las colegiaturas en tiempo real. Aquí podrá visualizar el total recaudado, los montos pendientes de pago y las colegiaturas que se encuentran vencidas.",
          },
        },
        {
          element: "#driver_colegiaturas-filtros",
          popover: {
            title: "Acciones para Regitros",
            description:
              "Utilice los filtros para localizar información de forma más precisa. Al aplicar un filtro, los datos mostrados en los indicadores y en la tabla se actualizarán automáticamente según los criterios seleccionados. o exporte datos a archivos Excel para la creación de reportes.",
          },
        },
        {
          element: "#driver_colegiaturas-buscador",
          popover: {
            title: "Buscar una Colegiatura",
            description:
              "Utilice este buscador para localizar una colegiatura específica mediante los datos del alumno, como nombre, apellidos o matrícula.",
          },
        },
        {
          element: "#driver_colegiaturas-estados",
          popover: {
            title: "Filtrar por Estado",
            description:
              "Permite filtrar las colegiaturas según su estado actual. Puede visualizar únicamente las colegiaturas pendientes, pagadas o vencidas para obtener un análisis más preciso.",
          },
        },
        {
          element: "#driver_colegiaturas-mes",
          popover: {
            title: "Filtrar por Mes",
            description:
              "Utilice este filtro para visualizar las colegiaturas correspondientes a un mes específico. De forma predeterminada, el sistema mostrará los registros del mes actual.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_colegiaturas-tabla",
          popover: {
            title: "Registros",
            description:
              "En esta tabla se muestran todos los registros de colegiaturas disponibles en la base de datos. La información se actualizará automáticamente cuando se utilicen los filtros o el buscador.",
          },
        },
        {
          element: "#driver_colegiaturas-registros > :nth-child(1)",
          popover: {
            title: "Colegiatura",
            description:
              "Cada fila representa una colegiatura registrada en el sistema. Aquí podrá visualizar de forma rápida los datos principales relacionados con el pago correspondiente.",
          },
        },
        {
          element:
            "#driver_colegiaturas-registros > :nth-child(1) .registrar-pago",
          popover: {
            title: "Registrar Pago",
            description:
              "Utilice este botón para registrar el pago de la colegiatura seleccionada. El sistema asociará automáticamente el pago con el alumno correspondiente.",
          },
        },
        {
          element: "#driver_colegiaturas-registros > :nth-child(1) .historial",
          popover: {
            title: "Historial",
            description:
              "Este botón le permitirá acceder al historial completo de colegiaturas del alumno, donde podrá consultar el estado y registro de cada pago realizado.",
          },
        },
        {
          element: "#driver_colegiaturas-paginacion",
          popover: {
            title: "Paginación",
            description:
              "Cuando la cantidad de registros es elevada, el sistema divide la información en varias páginas para facilitar su visualización. Utilice estos controles para navegar entre ellas.",
          },
        },
        {
          element: "#driver_paginacion-numero",
          popover: {
            title: "Número de Página",
            description:
              "Indica el número de la página de registros que está visualizando actualmente.",
          },
        },
        {
          element: "#driver_paginacion-anterior",
          popover: {
            title: "Página Anterior",
            description:
              "Utilice este botón para regresar a la página anterior de registros. Si se encuentra en la primera página, el botón aparecerá deshabilitado.",
          },
        },
        {
          element: "#driver_paginacion-siguiente",
          popover: {
            title: "Página Siguiente",
            description:
              "Utilice este botón para avanzar a la siguiente página de registros. Si se encuentra en la última página, el botón aparecerá deshabilitado.",
          },
        },
        {
          element: "#driver_paginacion-botones .boton-paginacion",
          popover: {
            title: "Página Específica",
            description:
              "También puede acceder directamente a una página específica seleccionando su número. El botón correspondiente se resaltará cuando represente la página actual.",
            onNextClick: () => {
              setAdminPage(2);
              setTitulo("Pagos");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Pagos",
            description:
              "En esta sección podrá consultar y administrar todos los movimientos monetarios registrados en el sistema. Aquí se concentran los registros de pagos realizados por los alumnos.",
            onPrevClick: () => {
              setAdminPage(1);
              setTitulo("Colegiaturas");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_pagos-crear",
          popover: {
            title: "Registrar un Nuevo Pago",
            description:
              "Utilice este botón para registrar un nuevo pago manualmente. A diferencia del registro desde la sección de colegiaturas, aquí deberá seleccionar explícitamente al alumno y la colegiatura correspondiente antes de confirmar el pago.",
          },
        },
        {
          element: "#driver_pagos-indicadores",
          popover: {
            title: "Indicadores",
            description:
              "Este panel muestra indicadores generales sobre los pagos registrados en el sistema. Aquí podrá visualizar el monto total recaudado, el número total de pagos registrados y el promedio de ingresos por pago.",
          },
        },
        {
          element: "#driver_pagos-filtros",
          popover: {
            title: "Filtros",
            description:
              "Utilice estos filtros para localizar registros de pagos de forma más precisa según diferentes criterios disponibles en el sistema.",
          },
        },
        {
          element: "#driver_pagos-buscador",
          popover: {
            title: "Buscar un Pago",
            description:
              "El buscador permite localizar pagos específicos utilizando el nombre del tutor asociado al pago o la referencia del pago, en caso de que exista.",
          },
        },
        {
          element: "#driver_pagos-metodos",
          popover: {
            title: "Filtrar por Método de Pago",
            description:
              "Este filtro permite mostrar únicamente los pagos registrados con un método de pago específico, facilitando la consulta y el análisis de los registros.",
          },
        },
        {
          element: "#driver_pagos-fecha",
          popover: {
            title: "Filtrar por Fecha de Registro",
            description:
              "También puede filtrar los pagos según la fecha en que fueron registrados. El campo abrirá un calendario interactivo que le permitirá seleccionar la fecha deseada.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_pagos-tabla",
          popover: {
            title: "Registros",
            description:
              "En esta tabla se muestran todos los pagos registrados en la base de datos junto con su información general. Los resultados se actualizarán automáticamente al utilizar el buscador o aplicar filtros.",
          },
        },
        {
          element: "#driver_pagos-registros > :nth-child(1)",
          popover: {
            title: "Pago",
            description:
              "Cada fila representa un pago registrado en el sistema, mostrando su información principal junto con las acciones disponibles para consultarlo.",
          },
        },
        {
          element: "#driver_pagos-registros > :nth-child(1) .show-pago",
          popover: {
            title: "Ver Más",
            description:
              "Este botón permite acceder al detalle completo del pago, incluyendo la información del responsable, el servicio asociado y los datos del alumno relacionado.",
          },
        },
        {
          element: "#driver_pagos-paginación",
          popover: {
            title: "Paginación",
            description:
              "Cuando el número de registros es elevado, el sistema divide los resultados en varias páginas para facilitar su visualización. Puede utilizar estos controles para navegar entre los diferentes grupos de registros.",
            onNextClick: () => {
              setAdminPage(3);
              setTitulo("Estudiantes");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Estudiantes",
            description:
              "En esta sección podrá administrar toda la información relacionada con los estudiantes registrados en el sistema, incluyendo sus datos generales y su relación con los tutores correspondientes.",
            onPrevClick: () => {
              setAdminPage(2);
              setTitulo("Pagos");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
          },
        },
        {
          element: "#driver_estudiantes-total",
          popover: {
            title: "Estudiantes Totales",
            description:
              "Aquí se muestra en tiempo real el número total de estudiantes registrados actualmente en el sistema.",
          },
        },
        {
          element: "#driver_estudiantes-crear",
          popover: {
            title: "Nuevo Estudiante",
            description:
              "Utilice este botón para registrar un nuevo estudiante en la plataforma, ingresando la información necesaria para su identificación y gestión académica.",
          },
        },
        {
          element: "#driver_estudiantes-buscador",
          popover: {
            title: "Buscar Estudiante",
            description:
              "Localice rápidamente un estudiante utilizando su nombre, apellidos o matrícula dentro del sistema.",
          },
        },
        {
          element: "#driver_estudiantes-grado",
          popover: {
            title: "Filtrar por Grado",
            description:
              "Este filtro permite visualizar únicamente a los estudiantes que pertenecen a un grado académico específico.",
          },
        },
        {
          element: "#driver_estudiantes-estado",
          popover: {
            title: "Filtrar por Estado",
            description:
              "Filtre los estudiantes según su estado académico dentro de la institución, como activo, baja temporal o egresado.",
          },
        },
        {
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
          },
        },
        {
          element: "#driver_estudiantes-tabla",
          popover: {
            title: "Alumnos",
            description:
              "En esta tabla se muestran todos los estudiantes registrados en el sistema junto con su información general.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1)",
          popover: {
            title: "Alumno",
            description:
              "Cada fila representa a un estudiante y muestra su información principal para facilitar la consulta rápida de sus datos.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1) .perfil",
          popover: {
            title: "Perfil del Alumno",
            description:
              "Al acceder al perfil del estudiante podrá consultar toda la información detallada relacionada con él, incluyendo información sobre su tutor.",
          },
        },
        {
          element: "#driver_estudiantes-registros > :nth-child(1) .editar",
          popover: {
            title: "Editar Información del Alumno",
            description:
              "Si necesita corregir o actualizar algún dato del estudiante, utilice este botón para modificar su información registrada en el sistema.",
          },
        },
        {
          element: "#driver_estudiantes-paginacion",
          popover: {
            title: "Paginación",
            description:
              "Cuando el número de estudiantes es elevado, el sistema divide los registros en varias páginas para facilitar su visualización. Utilice estos controles para navegar entre las diferentes páginas de resultados.",
            onNextClick: () => {
              setAdminPage(4);
              setTitulo("Tutores");
              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Tutores",
            description:
              "En esta sección podrá administrar toda la información relacionada con los tutores registrados en el sistema, así como las relaciones que mantienen con los alumnos.",
            onPrevClick: () => {
              setAdminPage(3);
              setTitulo("Estudiantes");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_export-excel",
          popover: {
            title: "Exportar a Excel",
            description:
              "Utilice este botón para generar un archivo de Excel con los registros actualmente mostrados en la tabla. El archivo incluirá únicamente la información visible en pantalla en el momento de la exportación. Si aplica filtros por alumno, estado o mes, el reporte se generará respetando dichos criterios, permitiendo obtener reportes específicos y organizados para su análisis o resguardo.",
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
          element: "#driver_tutores-registros > :nth-child(1) .show-tutor",
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
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Publicaciones",
            description:
              "En esta sección se gestionan todas las publicaciones que aparecerán en el apartado público de eventos y noticias del sistema.",
            onPrevClick: () => {
              setAdminPage(4);
              setTitulo("Tutores");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_posts-listado > :nth-child(1) .post-delete",
          popover: {
            title: "Eliminar Publicación",
            description:
              "Este botón permite eliminar permanentemente la publicación seleccionada. El sistema solicitará una confirmación antes de ejecutar la eliminación.",
            onNextClick: () => {
              setAdminPage(6);

              setTimeout(() => {
                driverObj.moveNext();
              }, 300);
            },
          },
        },
        {
          element: "#driver_main",
          popover: {
            title: "Configuración",
            description:
              "En esta sección podrá administrar la configuración de su cuenta, actualizar sus datos personales y ejecutar nuevamente el tour de la aplicación cuando lo necesite.",
            onPrevClick: () => {
              setAdminPage(5);
              setTitulo("Publicaciones");
              setTimeout(() => {
                driverObj.movePrevious();
              }, 300);
            },
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
          element: "#driver_settings-password #driver_settings-password-campo",
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
          element: "#driver_cierre-ciclo",
          popover: {
            title: "Cierre de Ciclo Escolar",
            description:
              "En esta sección se ejecuta el proceso de cierre del ciclo escolar actual. Al realizar esta acción, el sistema desactiva el ciclo vigente, crea uno nuevo, promueve automáticamente a los alumnos al siguiente grado, egresa a los de último nivel y genera las colegiaturas correspondientes al nuevo ciclo. Este procedimiento es crítico y afecta toda la operación académica y financiera.",
          },
        },
        {
          element: "#driver_cierre-ciclo-btn",
          popover: {
            title: "Ejecutar cierre de ciclo",
            description:
              "Presione este botón para iniciar el cierre del ciclo escolar. Antes de continuar, el sistema solicitará una confirmación para evitar ejecuciones accidentales. Una vez confirmado, el proceso se ejecutará de forma automática y no podrá revertirse.",
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

  return { startTour, startTutorTour };
}
