
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        </div>
    );
};

export const LoadingBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-4">
            <div
                className="bg-gradient-to-r from-brand-secondary to-brand-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
