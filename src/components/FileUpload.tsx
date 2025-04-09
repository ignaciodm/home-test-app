import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api/tasks';
import { Task, useTaskContext } from '../context/TaskContext';
import { useTaskPolling } from '../hooks/useTaskPolling';

export default function FileUpload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');

    const {addTask, tasks, startPolling, stopPolling} = useTaskContext();
    const [taskId, setTaskId] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: uploadFile,
        onSuccess: (data) => {
            const task: Task = {
                id: data.taskId,
                name: selectedFile?.name || 'Unknown',
                status: 'pending',
            };

            addTask(task);  // Add the task to context
            setTaskId(data.taskId);  // Set taskId to trigger global polling

            startPolling();  // Start global polling for all tasks

            setSelectedFile(null);  // Clear file input
        },
        onError: () => {
            setError('Failed to submit file.');
            setSelectedFile(null);
        },
    });

    // Call useTaskPolling with taskId and enabled status (polling starts after taskId is set)
    useTaskPolling(taskId!, taskId !== null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isValidType = /pdf|image/.test(file.type);
        const isValidSize = file.size < 2 * 1024 * 1024;

        if (!isValidType) {
            setError('Only PDFs and images allowed');
            return;
        }

        if (!isValidSize) {
            setError('File must be under 2MB');
            return;
        }

        setError('');
        setSelectedFile(file);
    };

    const handleSubmit = () => {
        if (!selectedFile) return;
        mutation.mutate(selectedFile);
    };

    return (
        <div className="space-y-2 border p-4 rounded-md bg-white shadow">
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {selectedFile && <p className="text-sm text-gray-700">Selected: {selectedFile.name}</p>}

            <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!selectedFile || mutation.isPending}
            >
                {mutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
}