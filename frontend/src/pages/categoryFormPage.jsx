import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

import { useCategories } from "../context/CategoryContext";

function CategoryFormPage() {
    const { 
        register, 
        handleSubmit,
        setValue,
        formState: { errors } 
    } = useForm();

    const { createCategory, errors: errorsCategory,getCategory, updateCategory  } = useCategories();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() =>{
        async function loadCategory(){
            if(params.id) {
                const categoryRes = await getCategory(params.id);
                setValue('title', categoryRes.title);
                setValue('code', categoryRes.code);
            }
        }
        loadCategory()
    },[])

    const onSubmit = handleSubmit(async (values) => {
        const categoryData = {
            ...values
        };
        if(params.id){
            console.log("categoryData-->", categoryData);
            
            updateCategory(params.id, categoryData)
        }else{
            createCategory(categoryData);
        }
        navigate('/categories');
    });

    return(
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <h1 className="text-2xl font-bold text-white">Register categories</h1>
                <form onSubmit={onSubmit}>
                <input 
                        { ... register("title",{required: true})}
                        type="text" 
                        placeholder="Title"
                        className="w-full bg-zinc-700 text-white px-6 py-2 rounded-md my-2"
                        autoFocus
                    />
                    <input 
                        { ... register("code",{required: true})}
                        type="text" 
                        className="w-full bg-zinc-700 text-white px-6 py-2 rounded-md my-2"
                        placeholder="Code"
                    />
                    <button type="submit" className="inline-block px-4 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CategoryFormPage;