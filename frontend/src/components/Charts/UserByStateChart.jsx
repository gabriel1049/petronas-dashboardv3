import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function UserByStateChart({ users }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!users.length) return;

    const stateCounts = users.reduce((acc, user) => {
      const state = user.state || 'Não informado';
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    const data = {
      labels: Object.keys(stateCounts),
      datasets: [
        {
          label: 'Usuários por Estado',
          data: Object.values(stateCounts),
          backgroundColor: 'rgba(0, 156, 166, 0.6)',
          borderColor: 'rgba(0, 156, 166, 1)',
          borderWidth: 1,
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
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, config);
  }, [users]);

  return (
    <div className="bg-white rounded shadow p-4 mt-8 h-[300px] sm:h-[250px]">
  <h3 className="text-lg font-semibold mb-4">Distribuição por Estado</h3>
  <canvas ref={chartRef} className="w-full h-full" />
</div>

  );
}
