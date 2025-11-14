import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AspectRatio, ImageStyle, GeneratedImage, aspectRatios, imageStyles } from '../types';
import { correctPrompt, generateOrEditImage } from '../services/geminiService';
// FIX: Import SparklesIcon to resolve usage error.
import { WandIcon, UploadIcon, SparklesIcon } from '../components/Icons';
import LoadingSpinner, { LoadingBar } from '../components/LoadingSpinner';

interface CreatePageProps {
    addImageToHistory: (image: GeneratedImage) => void;
}

const CreatePage: React.FC<CreatePageProps> = ({ addImageToHistory }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('Realistic');
    const [baseImage, setBaseImage] = useState<File | null>(null);
    const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrecting, setIsCorrecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // FIX: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout for browser compatibility.
        let timer: ReturnType<typeof setInterval>;
        if (isLoading) {
            setProgress(0);
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(timer);
                        return 95;
                    }
                    return prev + 5;
                });
            }, 500);
        } else {
            setProgress(0);
        }
        return () => clearInterval(timer);
    }, [isLoading]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setBaseImage(file);
            setBaseImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAutoCorrect = useCallback(async () => {
        if (!prompt.trim()) return;
        setIsCorrecting(true);
        try {
            const corrected = await correctPrompt(prompt);
            setPrompt(corrected);
        } catch (err) {
            console.error(err);
        } finally {
            setIsCorrecting(false);
        }
    }, [prompt]);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageUrl = await generateOrEditImage({
                prompt,
                style: selectedStyle,
                ratio: selectedRatio,
                baseImage: baseImage || undefined
            });
            if (imageUrl) {
                setGeneratedImage(imageUrl);
                const newImage: GeneratedImage = {
                    id: new Date().toISOString(),
                    prompt,
                    style: selectedStyle,
                    ratio: selectedRatio,
                    imageUrl,
                    createdAt: new Date(),
                };
                addImageToHistory(newImage);
                 setProgress(100);
            } else {
                throw new Error('Image generation returned no result.');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedStyle, selectedRatio, baseImage, addImageToHistory]);
    
    return (
        <div className="container mx-auto px-4 py-8 animate-slide-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: Controls */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Prompt Input */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="font-bold text-lg mb-4">Your Prompt</h3>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A majestic lion king on a cliff..."
                            className="w-full h-32 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary border-transparent transition"
                        />
                        <button
                            onClick={handleAutoCorrect}
                            disabled={isCorrecting}
                            className="w-full mt-2 px-4 py-2 text-sm font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-lg flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-800 transition disabled:opacity-50"
                        >
                            <WandIcon className="w-5 h-5 mr-2" />
                            {isCorrecting ? 'Correcting...' : 'Auto-Correct Prompt'}
                        </button>
                    </div>

                    {/* Image Upload for Editing */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                         <h3 className="font-bold text-lg mb-4">Edit an Image (Optional)</h3>
                         <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                         <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-brand-primary hover:text-brand-primary transition"
                         >
                            <UploadIcon className="w-8 h-8 mb-2" />
                            <span>{baseImage ? baseImage.name : 'Upload Image'}</span>
                         </button>
                         {baseImagePreview && <img src={baseImagePreview} alt="Preview" className="mt-4 rounded-lg w-full object-cover" />}
                    </div>
                    
                    {/* Style and Ratio */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
                         <div>
                            <h3 className="font-bold text-lg mb-4">Style</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {imageStyles.map(style => (
                                    <button key={style} onClick={() => setSelectedStyle(style)} className={`px-2 py-2 text-sm rounded-lg transition ${selectedStyle === style ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Aspect Ratio</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {aspectRatios.map(ratio => (
                                    <button key={ratio} onClick={() => setSelectedRatio(ratio)} className={`py-2 rounded-lg transition ${selectedRatio === ratio ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 aspect-[4/3] flex flex-col justify-center items-center">
                            {isLoading ? (
                                <div className="text-center w-full max-w-md">
                                    <LoadingSpinner />
                                    <p className="mt-4 font-semibold">Generating your masterpiece...</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">This can take a moment.</p>
                                    <LoadingBar progress={progress} />
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500">
                                    <p className="font-bold">Generation Failed</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            ) : generatedImage ? (
                                <img src={generatedImage} alt={prompt} className="w-full h-full object-contain rounded-lg" />
                            ) : (
                                <div className="text-center text-gray-400 dark:text-gray-500">
                                    <SparklesIcon className="w-24 h-24 mx-auto" />
                                    <p className="mt-4 font-semibold text-lg">Your generated image will appear here</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full mt-6 py-4 text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
