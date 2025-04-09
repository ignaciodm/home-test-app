import { useQuery } from '@tanstack/react-query';
import { getTaskStatus } from '../api/tasks';
import { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const POLL_INTERVAL_MS = 3000;
const RETRY_COUNT = 3;

/**
 * The useTaskPolling hook will be used to poll the task status
 * periodically (every 3 seconds),
 * automatically retry on failure, and handle status updates.
 */
export function useTaskPolling(taskId: string, enabled: boolean) {
    const {startPolling, stopPolling, updateTaskStatus} = useTaskContext();

    const {data, error, isFetching, isError} = useQuery({
        queryKey: ['task-status', taskId],
        queryFn: () => getTaskStatus(taskId),
        refetchInterval: POLL_INTERVAL_MS,
        enabled,
        retry: RETRY_COUNT,
        staleTime: 0,
    });

    useEffect(() => {
        // Start polling immediately when component mounts
        startPolling();

        debugger
        if (isFetching) {
            updateTaskStatus(taskId, 'processing'); // Update task status to "processing"
        }

        if (data?.status === 'success' || data?.status === 'error') {
            updateTaskStatus(taskId, data.status);
        }

        // Cleanup on unmount (stop polling)
        return () => stopPolling();
    }, [data, taskId, isError, error, isFetching, enabled, startPolling, stopPolling, updateTaskStatus]);

    return {isFetching, isError, error};
}