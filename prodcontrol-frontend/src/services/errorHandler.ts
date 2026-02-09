export interface ApiError {
    message: string;
    status?: number;
    details?: unknown;
}

export const handleApiError = (error: unknown): ApiError => {
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; }; status?: number; }; request?: unknown; message?: string; };
        // Server responded with error status
        return {
            message: axiosError.response?.data?.message || 'Server error occurred',
            status: axiosError.response?.status,
            details: axiosError.response?.data
        };
    } else if (error && typeof error === 'object' && 'request' in error) {
        // Request was made but no response received
        return {
            message: 'Network error. Please check your connection.',
            status: 0
        };
    } else {
        // Something else happened
        const errorMessage = error && typeof error === 'object' && 'message' in error 
            ? (error as { message: string }).message 
            : 'An unexpected error occurred';
        return {
            message: errorMessage
        };
    }
};

export const getErrorMessage = (error: unknown): string => {
    const apiError = handleApiError(error);
    
    switch (apiError.status) {
        case 400:
            return 'Invalid data provided. Please check your input.';
        case 404:
            return 'Resource not found.';
        case 422:
            return typeof apiError.details === 'object' && apiError.details && 'message' in apiError.details 
                ? (apiError.details as { message: string }).message 
                : 'Validation error.';
        case 500:
            return 'Server error. Please try again later.';
        default:
            return apiError.message;
    }
};
