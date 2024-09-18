
export function sanitize(input: string): string {
    try {
        const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, '');

        if(input.length > 100) {
            throw new Error('Input is too long');
        } 
        return sanitizedInput;

    } catch (error) {
        throw new Error('Error while trying to validate input');
    }
}