import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({
    data = [],
    fileName = "reporte",
    sheetName = "Datos",
    columns = null,
    children,
}) {
    const exportarExcel = () => {
        if (!data.length) {
            console.warn("No hay datos para exportar");
            return;
        }

        let datosProcesados = data;

        // Si se especifican columnas, ordenar y filtrar
        if (columns) {
            datosProcesados = data.map((row) => {
                const nuevo = {};
                columns.forEach((col) => {
                    nuevo[col.label] = row[col.key];
                });
                return nuevo;
            });
        }

        const worksheet = XLSX.utils.json_to_sheet(datosProcesados);

        // Ajustar ancho automático de columnas
        const columnWidths = Object.keys(datosProcesados[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...datosProcesados.map((row) =>
                    row[key] ? row[key].toString().length : 10,
                ),
            ),
        }));

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${fileName}.xlsx`);
    };

    return <button onClick={exportarExcel}>{children}</button>;
}
