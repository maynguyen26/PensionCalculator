import type { AdminEmployee } from '../hooks/useAdminData.ts'
import Button from './Button.tsx'

type Props = {
  employees: AdminEmployee[]
  search: string
  onView: (id: number) => void
  onDelete: (id: number) => void
}

export default function EmployeeTable({ employees, search, onView, onDelete }: Props) {
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  )

  const headers = ['Name', 'Department', 'Role', 'Hire Date', 'Calculations', '']

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h} className="text-left text-xs font-semibold uppercase tracking-wide text-gray-400 pb-3 border-b border-gray-100">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filtered.map(e => (
          <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="py-3">
              <div className="font-medium text-brand-navy">{e.name}</div>
              <div className="text-xs text-gray-400">{e.email}</div>
            </td>
            <td className="py-3">
              <span className="text-xs bg-brand-bg text-gray-500 px-2 py-1 rounded-full">
                {e.department}
              </span>
            </td>
            <td className="py-3 text-sm text-gray-500">{e.role}</td>
            <td className="py-3 text-sm text-gray-500">
              {new Date(e.hireDate).toLocaleDateString()}
            </td>
            <td className="py-3 text-sm text-gray-500">{e.calculationCount}</td>
            <td className="py-3">
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => onView(e.id)}>View</Button>
                <Button variant="danger" onClick={() => onDelete(e.id)}>Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}