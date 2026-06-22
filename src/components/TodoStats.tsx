interface Stats {
  total: number
  active: number
  completed: number
}

interface TodoStatsProps {
  stats: Stats
}

export default function TodoStats({ stats }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
        <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
        <p className="text-sm text-gray-500 mt-1">Total</p>
      </div>
      <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
        <p className="text-3xl font-bold text-amber-500">{stats.active}</p>
        <p className="text-sm text-gray-500 mt-1">Active</p>
      </div>
      <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
        <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
        <p className="text-sm text-gray-500 mt-1">Done</p>
      </div>
    </div>
  )
}
