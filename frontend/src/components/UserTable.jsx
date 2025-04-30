export default function UserTable({ users }) {
    return (
      <div className="overflow-x-auto mt-10">
        <h2 className="text-lg font-semibold mb-2">Participantes</h2>
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Cidade</th>
              <th className="text-left p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.city}</td>
                <td className="p-2">{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  