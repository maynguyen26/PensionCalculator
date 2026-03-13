import Navbar from '../components/Navbar.tsx'
import Card from '../components/Card.tsx'
import StatCard from '../components/StatCard.tsx'
import PensionForm from '../components/PensionForm.tsx'
import CalculationHistory from '../components/CalculationHistory.tsx'
import LoadingSpinner from '../components/LoadingSpinner.tsx'
import { useEmployee } from '../hooks/useEmployee.ts'

export default function EmployeeDashboard() {
  const { employee, loading, error, refetch } = useEmployee()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  if (!employee) return null

  const latest = employee.pensionCalculations[0]
  const yearsOfService = new Date().getFullYear() - new Date(employee.hireDate).getFullYear()

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar name={employee.name} role={employee.role} />

      <div className="max-w-5xl mx-auto px-10 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-brand-navy">
            Good morning, <em className="text-brand-gold">{employee.name.split(' ')[0]}.</em>
          </h1>
          <p className="text-gray-400 mt-2">{employee.department} · {yearsOfService} years of service</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card title="Estimated Monthly Pension">
            <div className="text-center py-4">
              <div className="font-serif text-6xl text-brand-navy tracking-tight">
                <span className="text-3xl text-brand-gold">$</span>
                {latest ? latest.estimatedMonthlyPension.toLocaleString() : '—'}
              </div>
              <p className="text-gray-400 text-sm mt-2">per month at retirement</p>
            </div>
          </Card>

          <Card title="Your Details">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Annual Salary" value={latest ? `$${latest.annualSalary.toLocaleString()}` : '—'} />
              <StatCard label="Contribution" value={latest ? `${latest.contributionPercentage}%` : '—'} accent />
              <StatCard label="Years of Service" value={yearsOfService} />
              <StatCard label="Calculations" value={employee.pensionCalculations.length} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <PensionForm onCalculated={refetch} />
          <CalculationHistory calculations={employee.pensionCalculations} />
        </div>
      </div>
    </div>
  )
}