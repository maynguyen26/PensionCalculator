import { useState } from 'react'
import api from '../services/api'
import Button from './Button.tsx'
import Input from './Input.tsx'
import Card from './Card.tsx'

type Props = { onCalculated: () => void }
type Form = { annualSalary: string; contributionPercentage: string; yearsOfService: string }

export default function PensionForm({ onCalculated }: Props) {
  const [form, setForm] = useState<Form>({ annualSalary: '', contributionPercentage: '', yearsOfService: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleCalculate = async () => {
    setLoading(true)
    setError('')
    try {
      await api.post('/api/pension/calculate', {
        annualSalary: parseFloat(form.annualSalary),
        contributionPercentage: parseFloat(form.contributionPercentage),
        yearsOfService: parseInt(form.yearsOfService),
      })
      onCalculated()
    } catch {
      setError('Calculation failed. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Run a New Calculation">
      <Input label="Annual Salary ($)" value={form.annualSalary} onChange={update('annualSalary')} placeholder="85000" />
      <Input label="Contribution (%)" value={form.contributionPercentage} onChange={update('contributionPercentage')} placeholder="6" />
      <Input label="Years of Service" value={form.yearsOfService} onChange={update('yearsOfService')} placeholder="8" />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Button onClick={handleCalculate} disabled={loading} fullWidth>
        {loading ? 'Calculating...' : 'Calculate Pension'}
      </Button>
    </Card>
  )
}