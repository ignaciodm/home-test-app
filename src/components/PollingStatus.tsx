import { useTaskContext } from '../context/TaskContext';

const PollingStatus = () => {
    const {isPolling} = useTaskContext();


    return (
        <>
            Syncing with the server...
            {isPolling && (
                <span className="text-lg">✔</span>
            )}
        </>
    );
};

export default PollingStatus;