import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('/upload', () => {
        return HttpResponse.json({ taskId: 'mock-task-id' })
    }),
]