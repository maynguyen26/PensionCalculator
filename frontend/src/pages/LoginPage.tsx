import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/Button.tsx'
import Input from '../components/Input.tsx'

type FormState = { email: string; password: string }

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/api/Auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      navigate(data.role === 'Admin' ? '/admin' : '/dashboard')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const fields: { label: string; field: keyof FormState; type: string; placeholder: string }[] = [
    { label: 'Email address', field: 'email', type: 'email', placeholder: 'you@westgate-pension.ca' },
    { label: 'Password', field: 'password', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left Panel */}
      <div className="bg-brand-navy p-16 flex flex-col justify-between">
        <div className="font-serif text-2xl text-brand-gold">Westgate Pension</div>
        <div>
          <div className="font-serif text-5xl text-white leading-tight">
            Your retirement,<br />
            <em className="text-brand-gold">secured.</em>
          </div>
          <p className="text-brand-muted text-sm mt-4 leading-relaxed">
            A modern pension administration platform for members and employers across Canada.
          </p>
        </div>
        <div className="text-brand-border text-xs">© 2026 Westgate Pension Group</div>
      </div>

      {/* Right Panel */}
      <div className="bg-brand-bg flex items-center justify-center p-16">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-3xl text-brand-navy mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to access your pension portal</p>

          {fields.map(({ label, field, type, placeholder }) => (
            <Input
              key={field}
              label={label}
              type={type}
              value={form[field]}
              onChange={update(field)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder={placeholder}
            />
          ))}

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <Button onClick={handleLogin} disabled={loading} fullWidth>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </div>
    </div>
  )
}