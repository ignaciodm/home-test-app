import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function FileUpload() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const mutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            const res = await axios.post('/upload', formData)
            return res.data
        },
        onSuccess: (data) => {
            console.log('Task ID:', data.taskId)
            // TODO: add to task context or start polling
        },
        onError: () => {
            setError('Failed to submit file.')
        },
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const isValidType = /pdf|image/.test(file.type)
        const isValidSize = file.size < 2 * 1024 * 1024

        if (!isValidType) {
            setError('Only PDFs and images allowed')
            return
        }

        if (!isValidSize) {
            setError('File must be under 2MB')
            return
        }

        setError('')
        setSelectedFile(file)
    }

    const handleSubmit = () => {
        if (!selectedFile) return
        mutation.mutate(selectedFile)
    }

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
    )
}
