
import React from 'react';
import { GeneratedImage } from '../types';

interface HistoryPageProps {
    history: GeneratedImage[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history }) => {
    if (history.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center animate-fade-in">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Your History</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">You haven't generated any images yet.</p>
                <p className="text-gray-500 dark:text-gray-400">Go to the 'Create' page to start generating!</p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">Your Generation History</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Here are the images you've created in this session.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {history.map((image) => (
                    <div key={image.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <img src={image.imageUrl} alt={image.prompt} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">{image.prompt}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{image.style}</span>
                                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{image.ratio}</span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{image.createdAt.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
