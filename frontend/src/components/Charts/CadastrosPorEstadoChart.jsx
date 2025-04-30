import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { agruparPorEstado } from '../../utils/dataUtils';

export default function CadastrosPorEstadoChart({ users }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!users.length) return;

    const agrupado = agruparPorEstado(users);

    const data = {
      labels: Object.keys(agrupado),
      datasets: [
        {
          label: 'Cadastros por Estado',
          data: Object.values(agrupado),
          backgroundColor: '#00B2B9',
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
        },
        scales: {
          x: { title: { display: true, text: 'Estado' } },
          y: { title: { display: true, text: 'Cadastros' } },
        },
      },
    };

    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, config);
  }, [users]);

  return (
    <div className="bg-white rounded shadow p-4 mt-8 h-[300px] sm:h-[250px]">
  <h3 className="text-lg font-semibold mb-4 border-l-4 border-petronas pl-2">
    Cadastros por Estado
  </h3>
  <canvas ref={chartRef} className="w-full h-full" />
</div>

  );
}
