import { useState } from 'react'
import Navbar from '../components/Navbar.tsx'
import StatCard from '../components/StatCard.tsx'
import EmployeeTable from '../components/EmployeeTable.tsx'
import EmployeeDetail from '../components/EmployeeDetail.tsx'
import LoadingSpinner from '../components/LoadingSpinner.tsx'
import Input from '../components/Input.tsx'
import { useAdminData } from '../hooks/useAdminData.ts'

export default function AdminDashboard() {
  const { employees, selectedEmployee, stats, loading, error, fetchEmployee, deleteEmployee, clearSelectedEmployee } = useAdminData()
  const [search, setSearch] = useState('')

  if (loading) return <LoadingSpinner />
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar name="Administrator" role="Admin" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-10">
        <div className="mb-8 md:mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-brand-navy">
            Member <em className="text-brand-gold">Overview</em>
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Organization-wide pension administration
          </p>
        </div>

        {/* Stats — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Members" value={stats.totalEmployees} />
          <StatCard label="Total Calculations" value={stats.totalCalculations} />
          <StatCard label="Avg. Years of Service" value={stats.avgYearsOfService} />
          <StatCard label="Departments" value={[...new Set(employees.map(e => e.department))].length} />
        </div>

        {/* Table + Detail panel */}
        <div className="relative">
          <div className="bg-white rounded-2xl border border-brand-card">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-6 md:px-8 pt-6 md:pt-8 pb-4">
              All Members
            </div>
            <div className="px-6 md:px-8 pb-4">
              <Input
                label=""
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or department..."
              />
            </div>
            {/* Mobile — vertical scroll for table */}
            <div className="overflow-x-auto px-6 md:px-8 pb-6 md:pb-8">
              <EmployeeTable
                employees={employees}
                search={search}
                onView={fetchEmployee}
                onDelete={deleteEmployee}
              />
            </div>
          </div>

          {/* Detail panel — full screen on mobile, overlay on desktop */}
          {selectedEmployee && (
            <div className="mt-6 md:mt-0 md:absolute md:top-0 md:right-0 md:w-1/2 md:shadow-2xl md:rounded-2xl">
              <EmployeeDetail
                employee={selectedEmployee}
                onClose={clearSelectedEmployee}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}