import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Todo, Priority, FilterType } from '@/types/todo'

const STORAGE_KEY = 'todo-app-todos'

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage)
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    saveToStorage(todos)
  }, [todos])

  const addTodo = useCallback((text: string, priority: Priority) => {
    if (!text.trim()) return
    const newTodo: Todo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    }
    setTodos(prev => [newTodo, ...prev])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const editTodo = useCallback((id: string, text: string) => {
    if (!text.trim()) return
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [])

  const updatePriority = useCallback((id: string, priority: Priority) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    )
  }, [])

  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed)
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  return {
    todos: filteredTodos,
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
  }
}
