import { useTaskContext } from '../context/TaskContext';

export default function TaskList() {
    const {tasks, cancelTask} = useTaskContext();

    if (tasks.length === 0) {
        return <p className="text-gray-500 text-sm text-center">No tasks yet.</p>;
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Submitted Tasks</h2>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className="flex items-center justify-between border rounded p-2 text-sm"
                    >
                        <span className="truncate">{task.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                              className={`capitalize text-xs px-2 py-0.5 rounded ${
                                  task.status === 'success'
                                      ? 'bg-green-100 text-green-700'
                                      : task.status === 'error'
                                          ? 'bg-red-100 text-red-700'
                                          : task.status === 'cancelled'
                                              ? 'bg-yellow-100 text-yellow-700'
                                              : 'bg-blue-100 text-blue-700'
                              }`}
                          >
                            {task.status}
                          </span>
                            {['processing', 'pending'].includes(task.status) && (
                                <button
                                    onClick={() => cancelTask(task.id)}
                                    className="text-red-500 hover:underline text-xs"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
