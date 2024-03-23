import React from 'react';
import { useThemes } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function ThemeCard({ theme }) {
    const { deleteTheme } = useThemes();
    
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md text-white'>
            <header className='flex justify-between'>
                <h1 className='text-2xl font-bold'>{theme.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteTheme(theme._id)
                            alert(`Theme deleted: ${theme.title}`)
                        }}
                    >
                        Delete
                    </button>
                    <Link className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md' to={`/theme/edit/${theme._id}`}>Edit</Link>
                </div>
            </header>
            <h1>Code: {theme.code}</h1>
            <div>
                <h1>Permissions:</h1>
                {theme.permissions.map(permission => (
                    <h1 key={permission} className="inline-block px-4 m-2 bg-gray-300 rounded-sm text-black">{permission}</h1>
                ))}
            </div>
            <p>
                {theme.createdAt &&
                new Date(theme.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
    );
}

export default ThemeCard;