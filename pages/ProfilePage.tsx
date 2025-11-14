
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from '../components/Icons';

const ProfilePage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">Profile & Settings</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Manage your account and preferences.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-8">
                {/* User Details */}
                <div>
                    <h3 className="text-xl font-bold mb-4">User Details</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500 dark:text-gray-400">Username</span>
                            <span className="font-semibold">CreativeUser123</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500 dark:text-gray-400">Email</span>
                            <span className="font-semibold">user@alriz.app</span>
                        </div>
                         <button className="w-full mt-2 px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            Change Password
                        </button>
                    </div>
                </div>

                 {/* Theme Selector */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Theme</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium">Appearance</span>
                        <div className="flex items-center space-x-2 p-1 bg-gray-200 dark:bg-gray-600 rounded-full">
                            <button onClick={() => theme === 'dark' && toggleTheme()} className={`p-2 rounded-full ${theme === 'light' ? 'bg-white shadow' : ''}`}>
                                <SunIcon className="w-5 h-5 text-yellow-500"/>
                            </button>
                             <button onClick={() => theme === 'light' && toggleTheme()} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 shadow' : ''}`}>
                                <MoonIcon className="w-5 h-5 text-indigo-400"/>
                            </button>
                        </div>
                    </div>
                </div>
                
                 {/* Pricing Info */}
                 <div>
                    <h3 className="text-xl font-bold mb-4">Plan</h3>
                     <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl">
                        <h4 className="text-2xl font-bold">Alriz is 100% Free</h4>
                        <ul className="mt-2 list-disc list-inside">
                            <li>Unlimited Prompts</li>
                            <li>Unlimited Generations</li>
                            <li>No Watermarks</li>
                        </ul>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default ProfilePage;
