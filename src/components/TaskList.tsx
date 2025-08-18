'use client'

import { useState } from 'react'

interface Task {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  id?: string | number
}

interface TaskListProps {
  tasks: Task[]
  onTaskToggle?: (taskId: string | number) => void
}

export default function TaskList({ tasks, onTaskToggle }: TaskListProps) {
    console.log('Tasks:', tasks)
  const [completedTasks, setCompletedTasks] = useState<Set<string | number>>(new Set())

  const handleTaskToggle = (taskId: string | number) => {
    const newCompletedTasks = new Set(completedTasks)
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId)
    } else {
      newCompletedTasks.add(taskId)
    }
    setCompletedTasks(newCompletedTasks)
    onTaskToggle?.(taskId)
  }

  const HighPriorityIcon = () => (
    <svg 
      className="w-4 h-4 text-red-500 flex-shrink-0" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )

  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-zinc-400 text-lg">No tasks yet</p>
          <p className="text-zinc-500 text-sm mt-1">Add your first task to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Your Tasks
      </h2>
      
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const taskId = task.id ?? index
          const isCompleted = completedTasks.has(taskId)
          
          return (
            <div 
              key={taskId}
              className={`group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4 transition-all duration-200 hover:bg-zinc-800/70 hover:border-zinc-600/50 hover:shadow-lg hover:shadow-zinc-900/20 ${
                isCompleted ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Custom Checkbox */}
                <button
                  onClick={() => handleTaskToggle(taskId)}
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'border-zinc-500 hover:border-indigo-400 hover:bg-indigo-400/10'
                  }`}
                >
                  {isCompleted && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className={`font-semibold text-lg leading-tight ${
                      isCompleted ? 'text-zinc-400 line-through' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>
                    {task.priority === 'high' && (
                      <div className="mt-1">
                        <HighPriorityIcon />
                      </div>
                    )}
                  </div>
                  
                  {task.description && (
                    <p className={`text-sm leading-relaxed ${
                      isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Priority Badge (for non-high priorities) */}
                {task.priority !== 'high' && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    task.priority === 'medium' 
                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                      : 'bg-zinc-600/50 text-zinc-400 border border-zinc-600/50'
                  }`}>
                    {task.priority}
                  </div>
                )}
              </div>

              {/* Subtle hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/0 via-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
