import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import {useAuthContext} from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signin, errors: errorsSignin, isAuthenticated } = useAuthContext()
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (values) => {
        signin(values);
        console.log(values);
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/themes");
        }
    }, [isAuthenticated]);

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg-zinc-800 max-w-md x-full p-10 rounded-md">
                {
                    errorsSignin.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                            {error 
                        }</div>
                    ))
                }
                <h1 className="text-2xl font-bold text-white">Login</h1>
                <form onSubmit={onSubmit}>
                    <input 
                        type="email" 
                        { ... register("email",{required: true})} 
                        placeholder="Email"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.email && (<p className="text-red-500">Email is required</p>)}
                    <input 
                        type="password" 
                        { ... register("password",{required: true})}  
                        placeholder="Password"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.password && (<p className="text-red-500">Password is required</p>)}
                    <button className="text-white bg-black hover:bg-green-600 font-bold py-2 px-4 rounded w-full" type="submit">Login</button>
                </form>
                <p className="text-white flex gap-x-2 justify-between">
                    Register now to get started! Here "
                    <Link to="/register" className="text-sky-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;