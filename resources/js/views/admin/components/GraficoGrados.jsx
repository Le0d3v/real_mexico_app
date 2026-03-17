import useStudent from "../../../hooks/useStudent";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficoGrados() {
    const isMobile = window.innerWidth < 768;
    const {
        estudiantesPrimerCiclo,
        estudiantesSegundoCiclo,
        estudiantesTercerCiclo,
        estudiantesCuartoCiclo,
        estudiantesQuintoCiclo,
        estudiantesSextoCiclo,
    } = useStudent();

    {
        const data = {
            labels: ["1°", "2°", "3°", "4°", "5°", "6°"],
            datasets: [
                {
                    label: "Estudiantes",
                    data: [
                        estudiantesPrimerCiclo.length,
                        estudiantesSegundoCiclo.length,
                        estudiantesTercerCiclo.length,
                        estudiantesCuartoCiclo.length,
                        estudiantesQuintoCiclo.length,
                        estudiantesSextoCiclo.length,
                    ],
                    backgroundColor: [
                        "#f59e0b", // amber
                        "#6366f1", // indigo
                        "#334155", // slate
                        "#10b981", // emerald
                        "#ef4444", // red
                        "#06b6d4", // cyan
                    ],
                    borderRadius: 5,
                    maxBarThickness: isMobile ? 35 : 50,
                    categoryPercentage: 0.6,
                    barPercentage: 0.7,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "#1e293b",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                    },
                    grid: {
                        color: "#e2e8f0",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
        };

        return <Bar data={data} options={options} />;
    }
}
