type Variant = 'primary' | 'secondary' | 'danger'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: Variant
  fullWidth?: boolean
  type?: 'button' | 'submit'
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gold text-brand-navy hover:bg-brand-gold-dark',
  secondary: 'border border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-gold',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

export default function Button({ children, onClick, disabled, variant = 'primary', fullWidth, type = 'button' }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        py-3 px-6 font-semibold rounded-lg transition-colors 
        disabled:opacity-50 cursor-pointer
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {children}
    </button>
  )
}