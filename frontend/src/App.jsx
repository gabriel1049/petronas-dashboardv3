import { useEffect, useState } from 'react';
import api from './services/api';

import Header from './components/Header';
import DashboardStats from './components/Cards/DashboardStats';
import CadastrosPorDiaChart from './components/Charts/CadastrosPorDiaChart';
import CadastrosPorEstadoChart from './components/Charts/CadastrosPorEstadoChart';
import CadastrosPorHoraChart from './components/Charts/CadastrosPorHoraChart';
import UserTable from './components/UserTable';
import ComparativoAnoChart from './components/Charts/ComparativoAnoChart';

import {
  calcularMediaCadastrosDia,
  contarNaoConcluidos,
} from './utils/dataUtils';

import { csvAnoPassado } from './data/csvAnoPassado'; // ✅ Adicionado
import Login from './Login';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (authenticated) {
      api.get('/users')
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('Erro ao carregar dados:', err));
    }
  }, [authenticated]);

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }

  const totalCadastros = users.length;
  const mediaPorDia = calcularMediaCadastrosDia(users);
  const naoConcluidos = contarNaoConcluidos(users);

  // ✅ Dados de 2024
  const total2024 = csvAnoPassado.reduce((acc, item) => acc + item.count, 0);
  const media2024 = (total2024 / csvAnoPassado.length).toFixed(1);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-6" id="dashboard-content">
        <DashboardStats
          total={totalCadastros}
          mediaPorDia={mediaPorDia}
          naoConcluidos={naoConcluidos}
          total2024={total2024}
          media2024={media2024}
        />

        <CadastrosPorDiaChart users={users} />
        <CadastrosPorEstadoChart users={users} />
        <CadastrosPorHoraChart users={users} />
        <ComparativoAnoChart users={users} />

        {/* <UserTable users={users} /> */}
        {/* <PdfExport targetId="dashboard-content" /> */}
      </main>
    </div>
  );
}

export default App;
