import dayjs from 'dayjs';

export function agruparPorDia(users) {
  const agrupado = {};

  users.forEach(user => {
    const dia = dayjs(user.created_at || user.date).format('DD/MM/YYYY');

    // IGNORA a data específica que você não quer exibir
    if (dia === '12/04/2025') return;

    agrupado[dia] = (agrupado[dia] || 0) + 1;
  });

  return agrupado;
}

// Agrupar cadastros por estado
export function agruparPorEstado(users) {
  return users.reduce((acc, user) => {
    const estado = user.state;

    // IGNORA se o estado estiver vazio ou "Não informado"
    if (!estado || estado === 'Não informado') return acc;

    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});
}

// Agrupar cadastros por hora (formato 00 a 23)
export function agruparPorHora(users) {
    return users.reduce((acc, user) => {
      if (!user.created_at) return acc;
  
      const hora = dayjs(user.created_at).format('HH'); // hora no formato 00-23
      acc[hora] = (acc[hora] || 0) + 1;
      return acc;
    }, {});
  }

// Calcular média de cadastros por dia
export function calcularMediaCadastrosDia(users) {
  const porData = {};

  users.forEach((user) => {
    const dia = dayjs(user.created_at).format('DD/MM/YYYY');
    porData[dia] = (porData[dia] || 0) + 1;
  });

  const totalDias = Object.keys(porData).length || 1;
  const totalCadastros = users.length;

  return (totalCadastros / totalDias).toFixed(1);
}

// Contar cadastros com termo não aceito (ex: não concluídos)
export function contarNaoConcluidos(users) {
  return users.filter((user) => user.terms !== 1).length;
}
