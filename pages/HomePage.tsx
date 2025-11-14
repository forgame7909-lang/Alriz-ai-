
import React from 'react';
import { Page } from '../types';
import { SAMPLE_IMAGES } from '../constants';

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    return (
        <div className="animate-fade-in">
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="relative inline-block">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/20 dark:bg-brand-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
                    <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Generate Any Image <br /> You Imagine — <span className="text-brand-primary">Instantly.</span>
                    </h1>
                </div>

                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    Alriz uses powerful AI to transform your text prompts into ultra-realistic, high-quality images. Unleash your creativity.
                </p>
                <div className="mt-10">
                    <button
                        onClick={() => setCurrentPage('create')}
                        className="px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:bg-brand-secondary transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                        Create Your Image
                    </button>
                </div>
            </section>
            
            <section className="py-16">
                 <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Inspiration Gallery</h2>
                    <div className="w-full overflow-hidden">
                        <div className="flex animate-[scroll_40s_linear_infinite] hover:pause">
                            {[...SAMPLE_IMAGES, ...SAMPLE_IMAGES].map((image, index) => (
                                <div key={`${image.id}-${index}`} className="flex-shrink-0 w-80 h-80 mx-4">
                                    <img 
                                        src={image.imageUrl} 
                                        alt={image.prompt} 
                                        className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    );
};

export default HomePage;
