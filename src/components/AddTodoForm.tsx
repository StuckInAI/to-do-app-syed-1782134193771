import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import type { Priority } from '@/types/todo'

interface AddTodoFormProps {
  onAdd: (text: string, priority: Priority) => void
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority)
    setText('')
    setPriority('medium')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2.5 flex items-center gap-1 font-medium transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </form>
  )
}
