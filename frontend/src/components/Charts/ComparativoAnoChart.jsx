
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { csvAnoPassado } from '../../data/csvAnoPassado';
import api from '../../services/api';
import dayjs from 'dayjs';

export default function ComparativoAnoChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [dados2025, setDados2025] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const res = await api.get('/users');
        const users = res.data || [];

        const agrupado = {};

        users.forEach((user) => {
          if (!user.created_at) return;
          const diaCampanha = dayjs(user.created_at).diff(dayjs('2025-04-23'), 'day') + 1;
          if (diaCampanha > 0) {
            agrupado[diaCampanha] = (agrupado[diaCampanha] || 0) + 1;
          }
        });

        const ordenado = Object.keys(agrupado)
          .sort((a, b) => a - b)
          .map((dia) => ({
            dia: `Dia ${dia}`,
            count: agrupado[dia],
          }));

        setDados2025(ordenado);
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err);
      }
    }

    fetchDados();
  }, []);

  useEffect(() => {
    if (!dados2025.length) return;

    const diasCampanha = Math.min(csvAnoPassado.length, dados2025.length);
    const labels = Array.from({ length: diasCampanha }, (_, i) => `Dia ${i + 1}`);

    const data2024 = csvAnoPassado.slice(0, diasCampanha).map(item => item.count);
    const data2025 = dados2025.slice(0, diasCampanha).map(item => item.count);

    const data = {
      labels,
      datasets: [
        {
          label: 'Cadastros 2024',
          data: data2024,
          borderColor: 'orange',
          backgroundColor: 'orange',
          tension: 0.4,
        },
        {
          label: 'Cadastros 2025',
          data: data2025,
          borderColor: 'green',
          backgroundColor: 'green',
          tension: 0.4,
        },
      ],
    };

    const config = {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, config);
  }, [dados2025]);

  return (
    <div className="bg-white rounded shadow p-4 mt-8 h-[300px] sm:h-[250px]">
      <h3 className="text-lg font-semibold mb-4 border-l-4 border-petronas pl-2">
        Comparativo Cadastros - Dias da Campanha
      </h3>
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
}
