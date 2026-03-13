export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-bg">
      <div className="w-8 h-8 border-4 border-brand-card border-t-brand-gold rounded-full animate-spin" />
    </div>
  )
}