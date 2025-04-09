import { http, HttpResponse } from 'msw';

const FAILURE_RATE = 0.2;

const taskStatusMap = new Map<string, { start: number; status: string }>();

const fileUpload = http.post('/upload', async () => {
    const taskId = crypto.randomUUID();
    taskStatusMap.set(taskId, {start: Date.now(), status: 'processing'});

    return HttpResponse.json({taskId});
});


const filePolling = http.get('/status/:taskId', ({params}) => {
    const {taskId} = params as { taskId: string };
    const task = taskStatusMap.get(taskId);

    if (!task) {
        return HttpResponse.json({status: 'error'}, {status: 404});
    }

    // Simulate occasional failure (20% chance)
    if (Math.random() < FAILURE_RATE) {
        return HttpResponse.json({error: 'Internal server error'}, {status: 500});
    }

    const elapsed = Date.now() - task.start;

    if (elapsed > 8000) {
        taskStatusMap.set(taskId, {...task, status: Math.random() > FAILURE_RATE ? 'success' : 'error'});
    }

    return HttpResponse.json({status: taskStatusMap.get(taskId)?.status});
});
export const handlers = [
    fileUpload,
    filePolling,
];

