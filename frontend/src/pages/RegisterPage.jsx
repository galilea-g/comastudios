import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from  "react-router-dom";

import Select from 'react-select';

import {useAuthContext} from '../context/AuthContext'

function RegisterPage() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    const { signup, isAuthenticated, errors: errorsRegister } = useAuthContext()
    const [selectedTypeUser, setSelectedTypeUser] = useState(null);
    const navigate = useNavigate()
    
    const optionsTypesUser = [
        { value: 1, label: 'Lector' },
        { value: 2, label: 'Creador' },
    ]

    //If user is authenticate go to page contenidos
    useEffect(() => {
        if (isAuthenticated){
            navigate("/themes")
        }
    },[isAuthenticated])

    const onSubmit = handleSubmit( async (values) => {
        const userData = {
            ...values,
            typeUser: selectedTypeUser?.value, // Add value from field selected
        };
        signup(userData);
    })

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    errorsRegister.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white my-2" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-2xl font-bold text-white">Register</h1>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        { ... register("username",{required: true})}
                        className="w-full bg-zinc-700 text-white px-6 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {errors.username && (<p className="text-red-500">Username is required</p>)}
                    <input 
                        type="email" 
                        { ... register("email",{required: true})} 
                        placeholder="Email"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.email && (<p className="text-red-500">Email is required</p>)}
                    <Select 
                        id="typeUser" 
                        name="typeUser" 
                        aria-label="Select type of user" 
                        options={optionsTypesUser}
                        onChange={(selectedOption) => setSelectedTypeUser(selectedOption)}
                    />
                    <input 
                        type="password" 
                        { ... register("password",{required: true})}  
                        placeholder="Password"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.password && (<p className="text-red-500">Password is required</p>)}
                    <button type="submit">Register</button>
                </form>
                <p className="text-white flex gap-x-2 justify-between">
                    Do you have  an account?{""}
                    <Link to="/login" className="text-sky-500">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;