import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

import { useThemes } from "../context/ThemeContext";

function ThemeFormPage() {
    const { 
        register, 
        handleSubmit,
        setValue,
        formState: { errors } 
    } = useForm();

    const optionsPermissions = [
        { value: 'IMAGEN', label: 'IMAGEN' },
        { value: 'YOUTUBE-VIDEO-URL', label: 'YOUTUBE-VIDEO-URL' },
        { value: 'TEXTO', label: 'TEXTO' },
    ];
    
    const { createTheme, errors: errorsTheme,getTheme, updateTheme  } = useThemes();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() =>{
        async function loadTheme() {
            if(params.id) {
                const themeRes = await getTheme(params.id);
                setValue('title', themeRes.title);
                setValue('code', themeRes.code);
                
                // Crea un array de opciones seleccionadas
                const selectedOptions = themeRes.permissions.map(permission => (
                    optionsPermissions.find(option => option.value === permission)
                ));
                
                // Asigna la opción filtrada a selectedPermisos
                setSelectedPermisos(selectedOptions);
            }
        }

        loadTheme();
    }, []);

    const [selectedPermisos, setSelectedPermisos] = useState(null);

    const onSubmit = handleSubmit(async (values) => {
        const contenidoData = {
            ...values,
            permissions: selectedPermisos ? selectedPermisos.map(option => option.value) : [], // Add value from field selected
        };
        if(params.id){
            console.log("contenidoData-->", contenidoData);
            
            updateTheme(params.id, contenidoData)
        }else{
            createTheme(contenidoData);
        }
        navigate('/themes');
    });

    return(
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    errorsTheme.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white my-2" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-2xl font-bold text-white">Register theme</h1>
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
                    <Select 
                        id="permissions" 
                        name="permissions" 
                        className="w-ful rounded-md"
                        aria-label="Select permissions" 
                        options={optionsPermissions}
                        isMulti
                        placeholder="Permissions of content"
                        noOptionsMessage={({ inputValue }) => `No result found for "${inputValue}"`}
                        value={selectedPermisos}
                        onChange={(selectedOption) => setSelectedPermisos(selectedOption)}
                    />
                    <button type="submit" className="inline-block px-4 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ThemeFormPage;
