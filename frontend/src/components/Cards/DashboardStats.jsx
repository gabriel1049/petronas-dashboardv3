export default function DashboardStats({ total, mediaPorDia, naoConcluidos, total2024, media2024 }) {
  const stats = [
    {
      label: 'Total de Cadastros',
      value: total,
      descricao: 'Participantes únicos registrados',
      extra: `Total em 2024: ${total2024}`,
    },
    {
      label: 'Média por Dia',
      value: mediaPorDia,
      descricao: 'Média com base em dias ativos',
      extra: `Média diária em 2024: ${media2024}`,
    },
    {
      label: 'Não Concluídos',
      value: naoConcluidos,
      descricao: 'Sem termo aceito ou incompletos',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-5 text-center border border-gray-100 hover:shadow-md transition"
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
          <p className="text-3xl font-bold text-petronas mt-2">{item.value}</p>
          <p className="text-sm text-gray-400 mt-1">{item.descricao}</p>
          {item.extra && (
            <p className="text-xs text-gray-400 mt-1 italic">{item.extra}</p>
          )}
        </div>
      ))}
    </div>
  );
}
