import React from 'react';
import { useEffect } from 'react';
import { useCategories } from '../context/CategoryContext';
import CategoryCard from '../components/CategoryCard'

function CategoryPage() {
    const { getCategories, categories } = useCategories();

    useEffect(() => {
        getCategories()
    },[])

    if(categories.length === 0){
        return (<h1>No categories yet</h1>)
    }


    return (
        <div>
            <div className='grid grid-cols-1 items-center justify-center'>
                <center><h1 className='text-5xl font-bold'>CATEGORIES</h1></center>
            </div>
            {
                    categories.map(category => (
                        <CategoryCard category= {category} key={category._id}/>
                    ))
                }
        </div>)
}

export default CategoryPage;