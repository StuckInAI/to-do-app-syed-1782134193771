import { Search, Trash2 } from 'lucide-react'
import type { FilterType } from '@/types/todo'

interface FilterBarProps {
  filter: FilterType
  setFilter: (f: FilterType) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  completedCount: number
  onClearCompleted: () => void
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f.value
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            Clear {completedCount} done
          </button>
        )}
      </div>
    </div>
  )
}
