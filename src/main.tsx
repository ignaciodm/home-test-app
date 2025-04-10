import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { worker } from './mocks/browser';
import { TaskProvider } from './context/TaskContext';

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
    worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <TaskProvider>
                <App/>
            </TaskProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
