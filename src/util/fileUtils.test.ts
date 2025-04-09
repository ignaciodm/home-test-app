import { describe, expect } from 'vitest';
import { validateFile } from './fileUtils';

describe('validateFile', () => {
    // Use test.each for parameterized testing
    test.each([
        // File type invalid: should fail with 'Only PDFs and images allowed'
        [{
            file: new File(['dummy content'], 'dummy.txt', {type: 'text/plain'}),
            expectedError: 'Only PDFs and images allowed'
        }],

        // File size too large: should fail with 'File must be under 2MB'
        [{
            file: new File(['dummy content'], 'largeImage.jpg', {type: 'image/jpeg'}),
            size: 3 * 1024 * 1024,
            expectedError: 'File must be under 2MB'
        }],

        // Valid image under 2MB: should pass with no error (null)
        [{
            file: new File(['dummy content'], 'image.jpg', {type: 'image/jpeg'}),
            size: 1 * 1024 * 1024,
            expectedError: null
        }],

        // Valid PDF under 2MB: should pass with no error (null)
        [{
            file: new File(['dummy content'], 'document.pdf', {type: 'application/pdf'}),
            size: 1 * 1024 * 1024,
            expectedError: null
        }],
    ])(
        'should validate the file correctly for %s type and size',
        ({file, size, expectedError}) => {
            // If file size is provided, set the size manually (as File constructor doesn't set size in test)
            if (size) {
                Object.defineProperty(file, 'size', {value: size});
            }

            // Run the validation function
            const result = validateFile(file);

            // Check that the result matches the expected error (or null for valid file)
            expect(result).toBe(expectedError);
        }
    );
});
