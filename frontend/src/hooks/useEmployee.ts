import { useEffect, useState } from 'react'
import api from '../services/api'

export type PensionCalculation = {
  id: number
  annualSalary: number
  contributionPercentage: number
  yearsOfService: number
  estimatedMonthlyPension: number
  calculatedAt: string
}

export type Employee = {
  id: number
  name: string
  email: string
  department: string
  role: string
  hireDate: string
  pensionCalculations: PensionCalculation[]
}

export function useEmployee() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchEmployee = async () => {
    try {
      const { data } = await api.get('/api/employee/me')
      setEmployee(data)
    } catch {
      setError('Failed to load your profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEmployee() }, [])

  return { employee, loading, error, refetch: fetchEmployee }
}