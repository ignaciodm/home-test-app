import './App.css';
import FileUpload from './components/FileUpload.tsx';
import TaskList from './components/TaskList';
import PollingStatus from './components/PollingStatus.tsx';

function App() {
    return (
        <>
            <div className="border border-red-500 p-2 bg-yellow-100 text-black">Tailwind border test</div>


            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-xl mx-auto space-y-6">
                    <h1 className="text-2xl font-semibold text-center">📤 File Upload Tracker</h1>
                    <PollingStatus/>
                    <FileUpload/>
                    <TaskList/>
                </div>
            </div>
        </>
    );
}

export default App;
