
import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import LibraryPage from './pages/LibraryPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import { Page, GeneratedImage } from './types';
import { SAMPLE_IMAGES } from './constants';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [history, setHistory] = useState<GeneratedImage[]>([]);
    const { theme } = useTheme();

    const addImageToHistory = useCallback((image: GeneratedImage) => {
        setHistory(prev => [image, ...prev]);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'create':
                return <CreatePage addImageToHistory={addImageToHistory} />;
            case 'library':
                return <LibraryPage sampleImages={SAMPLE_IMAGES} />;
            case 'history':
                return <HistoryPage history={history} />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className={`${theme} font-sans`}>
            <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
                <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <main className="pt-20">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;
