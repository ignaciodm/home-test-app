import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FileUpload from './components/FileUpload.tsx';
import TaskList from './components/TaskList';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>

            <div className="bg-green-500 text-white p-4">Tailwind Test</div>

            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-xl mx-auto space-y-6">
                    <h1 className="text-2xl font-semibold text-center">📤 File Upload Tracker</h1>
                    <FileUpload/>
                    <TaskList/>
                </div>
            </div>
        </>
    );
}

export default App;
