import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';

export default function UserByAgeChart({ users }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!users.length) return;

    const today = dayjs();
    const ageGroups = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55+': 0,
    };

    users.forEach((user) => {
      if (!user.dateOfBirth) return;
      const age = today.diff(dayjs(user.dateOfBirth), 'year');
      if (age < 25) ageGroups['18-24']++;
      else if (age < 35) ageGroups['25-34']++;
      else if (age < 45) ageGroups['35-44']++;
      else if (age < 55) ageGroups['45-54']++;
      else ageGroups['55+']++;
    });

    const data = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Faixa Etária',
          data: Object.values(ageGroups),
          backgroundColor: [
            '#009CA6',
            '#00B2B9',
            '#5CC4C9',
            '#B8E2E4',
            '#E0F7F8',
          ],
        },
      ],
    };

    const config = {
      type: 'pie',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
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
  <h3 className="text-lg font-semibold mb-4 border-l-4 border-petronas pl-2">
    Faixa Etária dos Participantes
  </h3>
  <canvas ref={chartRef} className="w-full h-full" />
</div>
  );
}
