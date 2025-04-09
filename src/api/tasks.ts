import axios from 'axios';

export async function uploadFile(file: File): Promise<{ taskId: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('/upload', formData);
    return res.data;
}

export async function getTaskStatus(taskId: string): Promise<{ status: string }> {
    const res = await axios.get(`/status/${taskId}`);
    return res.data;
}