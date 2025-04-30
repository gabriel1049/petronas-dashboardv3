export default function CardStat({ label, value }) {
    return (
      <div className="bg-white rounded shadow p-4 text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-petronas">{value}</p>
      </div>
    );
  }
  