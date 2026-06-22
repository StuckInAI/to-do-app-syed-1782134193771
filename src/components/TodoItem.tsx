import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import type { Todo, Priority } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onPriorityChange: (id: string, priority: Priority) => void
}

const priorityConfig: Record<Priority, { label: string; dot: string; badge: string }> = {
  low: { label: 'Low', dot: 'bg-green-400', badge: 'bg-green-50 text-green-600 border-green-200' },
  medium: { label: 'Medium', dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600 border-amber-200' },
  high: { label: 'High', dot: 'bg-red-400', badge: 'bg-red-50 text-red-600 border-red-200' },
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onPriorityChange }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
    } else {
      setEditText(todo.text)
    }
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditText(todo.text)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  const cfg = priorityConfig[todo.priority]

  return (
    <li className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 group transition ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-50 border border-indigo-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <span className={`block truncate text-gray-700 text-sm ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}>
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge + selector */}
      <div className="flex-shrink-0">
        {editing ? (
          <select
            value={todo.priority}
            onChange={e => onPriorityChange(todo.id, e.target.value as Priority)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1">
        {editing ? (
          <>
            <button
              onClick={commitEdit}
              className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition"
              aria-label="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  )
}
