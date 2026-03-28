import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  name: string
  role: string
}

export default function Navbar({ name, role }: Props) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="bg-brand-navy px-6 md:px-10 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16">
        <div className="font-serif text-xl text-brand-gold">Westgate Pension</div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-muted hover:text-white transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <div className={`w-6 h-0.5 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-border py-4 space-y-3">
          <div className="text-brand-muted text-sm">
            Signed in as <span className="text-white font-medium">{name}</span>
            <span className="ml-2 text-xs bg-brand-border text-brand-muted px-2 py-0.5 rounded-full">{role}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 border border-brand-border text-brand-muted text-sm rounded-md hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}