import React from 'react';
import { useCategories } from '../context/CategoryContext';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
    const { deleteCategory } = useCategories();
    
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md text-white'>
            <div className="my-4">
                <img src="https://www.tuexperto.com/wp-content/uploads/2022/02/50-fondos-de-pantalla-para-pc-con-windows-10-o-11-00.jpg.webp" alt={category.title} className="w-full rounded-lg" />
            </div>
            <header className='flex justify-between'>
                <h1 className='text-2xl font-bold'>{category.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteCategory(category._id)
                            alert(`Category deleted: ${category.title}`)
                        }}
                    >
                        Delete
                    </button>
                    <Link className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md' to={`/category/edit/${category._id}`}>Edit</Link>
                </div>
            </header>
            <h1>Code: {category.code}</h1>
            <p>
                {category.createdAt &&
                new Date(category.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
    );
}

export default CategoryCard;