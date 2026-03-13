type Props = {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function Input({ label, type = 'text', value, onChange, onKeyDown, placeholder }: Props) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-navy transition-colors"
      />
    </div>
  )
}