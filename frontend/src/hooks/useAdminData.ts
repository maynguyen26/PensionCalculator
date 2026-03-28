import { useEffect, useState } from 'react'
import api from '../services/api.ts'
import type { Employee } from './useEmployee.ts'

export type AdminEmployee = {
  id: number
  name: string
  email: string
  department: string
  role: string
  hireDate: string
  dateOfBirth: string
  calculationCount: number
}

export type AdminStats = {
  totalEmployees: number
  totalCalculations: number
  avgMonthlyPension: number
  avgYearsOfService: number
}

export function useAdminData() {
  const [employees, setEmployees] = useState<AdminEmployee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get('/api/employee')
      setEmployees(data)
    } catch {
      setError('Failed to load employees.')
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployee = async (id: number) => {
    try {
      const { data } = await api.get(`/api/employee/${id}`)
      setSelectedEmployee(data)
    } catch {
      setError('Failed to load employee details.')
    }
  }

  const deleteEmployee = async (id: number) => {
    try {
      await api.delete(`/api/employee/${id}`)
      setEmployees(prev => prev.filter(e => e.id !== id))
      if (selectedEmployee?.id === id) setSelectedEmployee(null)
    } catch {
      setError('Failed to delete employee.')
    }
  }

  useEffect(() => { fetchEmployees() }, [])

  const stats: AdminStats = {
    totalEmployees: employees.filter(e => e.role === 'Employee').length,
    totalCalculations: employees.reduce((sum, e) => sum + e.calculationCount, 0),
    avgMonthlyPension: 0,
    avgYearsOfService: Math.round(
      employees.reduce((sum, e) =>
        sum + (new Date().getFullYear() - new Date(e.hireDate).getFullYear()), 0)
      / (employees.length || 1)
    )
  }
  const clearSelectedEmployee = () => setSelectedEmployee(null)
  return { employees, selectedEmployee, stats, loading, error, fetchEmployee, deleteEmployee, clearSelectedEmployee }
  
}