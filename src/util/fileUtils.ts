export const validateFile = (file: File): string | null => {
    const isValidType = /pdf|image/.test(file.type)
    const isValidSize = file.size < 2 * 1024 * 1024

    if (!isValidType) {
        return 'Only PDFs and images allowed'
    }

    if (!isValidSize) {
        return 'File must be under 2MB'
    }

    return null  // Return null if file is valid
}
