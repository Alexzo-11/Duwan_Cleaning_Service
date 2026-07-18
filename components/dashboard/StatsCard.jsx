export default function StatsCard({ title, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800',
    yellow: 'bg-yellow-50 text-yellow-800',
    green: 'bg-green-50 text-green-800',
  }

  return (
    <div className={`p-6 rounded-2xl shadow-sm ${colorClasses[color] || colorClasses.blue}`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}