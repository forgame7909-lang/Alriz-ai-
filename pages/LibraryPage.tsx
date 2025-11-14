
import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { CopyIcon } from '../components/Icons';

interface LibraryPageProps {
    sampleImages: GeneratedImage[];
}

const ImageCard: React.FC<{ image: GeneratedImage }> = ({ image }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(image.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <img src={image.imageUrl} alt={image.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <p className="text-sm line-clamp-3">{image.prompt}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                             <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{image.style}</span>
                             <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{image.ratio}</span>
                        </div>
                        <button onClick={handleCopyPrompt} className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
                            <CopyIcon className="w-4 h-4" />
                        </button>
                    </div>
                     {copied && <span className="text-xs text-green-300 absolute bottom-2 right-2">Copied!</span>}
                </div>
            </div>
        </div>
    );
};

const LibraryPage: React.FC<LibraryPageProps> = ({ sampleImages }) => {
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">Inspiration Library</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Explore stunning images created with Alriz. Click to view and copy prompts.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sampleImages.map(image => (
                    <ImageCard key={image.id} image={image} />
                ))}
            </div>
        </div>
    );
};

export default LibraryPage;
