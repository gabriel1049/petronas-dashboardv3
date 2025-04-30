import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { agruparPorHora } from '../../utils/dataUtils';

export default function CadastrosPorHoraChart({ users }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!users.length) return;

    const agrupado = agruparPorHora(users);

    // Garante que todas as 24 horas sejam exibidas, mesmo com valor 0
    const horas = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const valores = horas.map((hora) => agrupado[hora] || 0);

    const data = {
      labels: horas,
      datasets: [
        {
          label: 'Cadastros por Hora do Dia',
          data: valores,
          backgroundColor: '#5CC4C9',
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
          x: { title: { display: true, text: 'Hora (00h–23h)' } },
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
    Cadastros por Hora do Dia
  </h3>
  <canvas ref={chartRef} className="w-full h-full" />
</div>
  );
}
