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
    isPolling: boolean
    pollingError: string | null
    startPolling: () => void
    stopPolling: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({children}: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isPolling, setIsPolling] = useState(false);  // Global polling flag
    const [pollingError, setPollingError] = useState<string | null>(null);

    // Add task to context
    const addTask = (task: Task) => setTasks((prev) => [task, ...prev]);

    // Update task status
    const updateTaskStatus = (id: string, status: TaskStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, status} : task
            )
        );
    };

    const cancelTask = (id: string) => updateTaskStatus(id, 'cancelled');

    const startPolling = () => setIsPolling(true);   // Start global polling
    const stopPolling = () => setIsPolling(false);   // Stop global polling

    return (
        <TaskContext.Provider
            value={{
                tasks,
                isPolling,
                pollingError,
                addTask,
                updateTaskStatus,
                cancelTask,
                startPolling,
                stopPolling,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within TaskProvider');
    return context;
}
