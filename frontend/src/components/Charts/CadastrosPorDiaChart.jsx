import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // ✅ IMPORTANTE
import { agruparPorDia } from '../../utils/dataUtils';

Chart.register(ChartDataLabels); // ✅ REGISTRA O PLUGIN

export default function CadastrosPorDiaChart({ users }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!users.length) return;

    const agrupado = agruparPorDia(users);

    const data = {
      labels: Object.keys(agrupado),
      datasets: [
        {
          label: 'Cadastros por Dia',
          data: Object.values(agrupado),
          backgroundColor: '#009CA6',
        },
      ],
    };

    const config = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: 'end',
            align: 'start',
            color: '#000',
            font: {
              weight: 'bold',
              size: 12,
            },
            formatter: Math.round,
          },
        },
        scales: {
          x: { title: { display: true, text: 'Data' } },
          y: { title: { display: true, text: 'Cadastros' } },
        },
      },
      plugins: [ChartDataLabels], // ✅ ATIVA O PLUGIN
    };

    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, config);
  }, [users]);

  return (
    <div className="bg-white rounded shadow p-4 mt-8 h-[300px] sm:h-[250px]">
      <h3 className="text-lg font-semibold mb-4 border-l-4 border-petronas pl-2">
        Cadastros por Dia
      </h3>
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
}
