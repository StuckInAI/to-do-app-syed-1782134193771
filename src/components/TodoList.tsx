import type { Todo, Priority } from '@/types/todo'
import TodoItem from '@/components/TodoItem'
import { ClipboardList } from 'lucide-react'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onPriorityChange: (id: string, priority: Priority) => void
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, onPriorityChange }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <ClipboardList className="w-12 h-12 mb-3 opacity-40" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Add a task above to get started</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </ul>
  )
}
