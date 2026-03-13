type Props = {
  children: React.ReactNode
  title?: string
}

export default function Card({ children, title }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-brand-card">
      {title && (
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}