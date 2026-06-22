import { CheckSquare } from 'lucide-react'

export default function TodoHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl shadow-lg mb-4">
        <CheckSquare className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">My Todos</h1>
      <p className="text-gray-500 mt-1">Stay organized, stay productive</p>
    </div>
  )
}
