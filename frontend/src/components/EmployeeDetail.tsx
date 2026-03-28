import Card from './Card.tsx'
import Button from './Button.tsx'
import type { Employee } from '../hooks/useEmployee.ts'

type Props = { 
  employee: Employee
  onClose: () => void
}

export default function EmployeeDetail({ employee, onClose }: Props) {
  return (
    <Card title={`${employee.name}'s Profile`}>
      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
        {[
          { label: 'Email', value: employee.email },
          { label: 'Department', value: employee.department },
          { label: 'Role', value: employee.role },
          { label: 'Hire Date', value: new Date(employee.hireDate).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</div>
            <div className="font-medium text-brand-navy">{value}</div>
          </div>
        ))}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
        Calculation History
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Date', 'Salary', 'Contribution', 'Monthly Pension'].map(h => (
              <th key={h} className="text-left text-xs text-gray-400 pb-2 border-b border-gray-100">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employee.pensionCalculations?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-400 text-sm py-4">
                No calculations yet.
              </td>
            </tr>
          )}
          {employee.pensionCalculations?.map(c => (
            <tr key={c.id} className="border-b border-gray-50">
              <td className="py-2 text-xs text-gray-500">{new Date(c.calculatedAt).toLocaleDateString()}</td>
              <td className="py-2 text-xs text-gray-500">${c.annualSalary.toLocaleString()}</td>
              <td className="py-2 text-xs text-gray-500">{c.contributionPercentage}%</td>
              <td className="py-2 text-xs font-semibold text-brand-navy">${c.estimatedMonthlyPension.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Button variant="secondary" onClick={onClose} fullWidth>
          Close
        </Button>
      </div>
    </Card>
  )
}