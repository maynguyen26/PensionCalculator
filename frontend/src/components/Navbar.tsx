import { useNavigate } from 'react-router-dom'

type Props = {
  name: string
  role: string
}

export default function Navbar({ name, role }: Props) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="bg-brand-navy px-10 flex items-center justify-between h-16 sticky top-0 z-10">
      <div className="font-serif text-xl text-brand-gold">Westgate Pension</div>
      <div className="flex items-center gap-5">
        <div className="text-brand-muted text-sm">
          Signed in as <span className="text-white font-medium">{name}</span>
          <span className="ml-2 text-xs bg-brand-border text-brand-muted px-2 py-0.5 rounded-full">{role}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-1.5 border border-brand-border text-brand-muted text-sm rounded-md hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}