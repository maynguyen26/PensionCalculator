type Props = {
  label: string
  value: string | number
  accent?: boolean
}

export default function StatCard({ label, value, accent }: Props) {
  return (
    <div className="bg-[#f9f8f6] rounded-xl p-4">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</div>
      <div className={`font-serif text-2xl ${accent ? 'text-brand-gold' : 'text-brand-navy'}`}>
        {value}
      </div>
    </div>
  )
}