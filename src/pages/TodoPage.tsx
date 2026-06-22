import TodoHeader from '@/components/TodoHeader'
import AddTodoForm from '@/components/AddTodoForm'
import FilterBar from '@/components/FilterBar'
import TodoList from '@/components/TodoList'
import TodoStats from '@/components/TodoStats'
import { useTodos } from '@/hooks/useTodos'

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    updatePriority,
    stats,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <TodoHeader />
        <TodoStats stats={stats} />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          completedCount={stats.completed}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onPriorityChange={updatePriority}
        />
      </div>
    </div>
  )
}
