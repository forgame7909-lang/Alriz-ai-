
import React from 'react';
import { Page } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, SparklesIcon } from './Icons';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
    page: Page;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isActive
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
                       <SparklesIcon className="w-8 h-8 text-brand-primary"/>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Alriz</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavLink page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
                        <NavLink page="create" currentPage={currentPage} setCurrentPage={setCurrentPage}>Create</NavLink>
                        <NavLink page="library" currentPage={currentPage} setCurrentPage={setCurrentPage}>Library</NavLink>
                        <NavLink page="history" currentPage={currentPage} setCurrentPage={setCurrentPage}>History</NavLink>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                         <NavLink page="profile" currentPage={currentPage} setCurrentPage={setCurrentPage}>Profile</NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
