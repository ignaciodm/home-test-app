import { createContext, ReactNode, useContext, useState } from 'react';

export type TaskStatus = 'pending' | 'processing' | 'success' | 'error' | 'cancelled'

export type Task = {
    id: string
    name: string
    status: TaskStatus
}

type TaskContextType = {
    tasks: Task[]
    addTask: (task: Task) => void
    updateTaskStatus: (id: string, status: TaskStatus) => void
    cancelTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({children}: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => setTasks(prev => [task, ...prev]);

    const updateTaskStatus = (id: string, status: TaskStatus) => {
        setTasks(prev => prev.map(task => (task.id === id ? {...task, status} : task)));
    };

    const cancelTask = (id: string) => updateTaskStatus(id, 'cancelled');

    return (
        <TaskContext.Provider value={{tasks, addTask, updateTaskStatus, cancelTask}}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within TaskProvider');
    return context;
}
