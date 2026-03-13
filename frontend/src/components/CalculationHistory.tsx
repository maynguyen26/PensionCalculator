import Card from './Card.tsx'
import type { PensionCalculation } from '../hooks/useEmployee.ts'

type Props = { calculations: PensionCalculation[] }

const headers = ['Date', 'Salary', 'Contribution', 'Monthly Pension']

export default function CalculationHistory({ calculations }: Props) {
  return (
    <Card title="Calculation History">
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
          {calculations.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-400 text-sm py-8">
                No calculations yet — run your first one!
              </td>
            </tr>
          )}
          {calculations.map(c => (
            <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3 text-sm text-gray-500">{new Date(c.calculatedAt).toLocaleDateString()}</td>
              <td className="py-3 text-sm text-gray-500">${c.annualSalary.toLocaleString()}</td>
              <td className="py-3 text-sm text-gray-500">{c.contributionPercentage}%</td>
              <td className="py-3 text-sm font-semibold text-brand-navy font-serif">${c.estimatedMonthlyPension.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}