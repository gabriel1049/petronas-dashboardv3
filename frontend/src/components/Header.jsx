export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Título */}
        <div className="flex items-center gap-3">
          <img
            src="/petronas-logo.png"
            alt="Logo Petronas"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-petronas tracking-tight">
            Dashboard PETRONAS
          </h1>
        </div>

        {/* Espaço reservado para futuros botões (ex: logout, filtros) */}
        {/* <div className="hidden sm:block">
          <button className="text-sm text-gray-500 hover:text-petronas transition">
            Ações futuras
          </button>
        </div> */}
      </div>
    </header>
  );
}
