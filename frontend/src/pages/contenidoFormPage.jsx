import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import Select from 'react-select';

function ContenidoFormPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    
    const optionsTypesCategories = [
        { value: 1, label: 'imagen' },
        { value: 2, label: 'video-url' },
        { value: 3, label: 'documento.txt' },
    ]

    const optionsTypesTheme = [
        { value: 1, label: 'Ciencia' },
        { value: 2, label: 'Matemáticas' },
        { value: 3, label: 'Deportes' },
    ]

    const onSubmit = handleSubmit( async (values) => {
        const contenidoData = {
            ...values,
            category: selectedCategory?.value, // Add value from field selected
            theme: selectedTheme?.value, // Add value from field selected
        };
        console.log("contenidoData --->", contenidoData)
    })

    return(
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <h1 className="text-2xl font-bold text-white">Register contenido</h1>
                <form onSubmit={onSubmit}>
                    <input 
                        { ... register("title",{required: true})}
                        type="text" 
                        placeholder="Title" 
                        autoFocus
                    />
                    <Select 
                        id="category" 
                        name="category" 
                        aria-label="Select category" 
                        options={optionsTypesCategories}
                        onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                    />
                    <Select 
                        id="theme" 
                        name="theme" 
                        aria-label="Select theme" 
                        options={optionsTypesTheme}
                        onChange={(selectedOption) => setSelectedTheme(selectedOption)}
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default ContenidoFormPage;