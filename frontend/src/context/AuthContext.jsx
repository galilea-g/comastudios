import {createContext, useState, useContext, useEffect } from 'react';
import { registerRequest,loginRequest, verifyTokenRequest } from '../api/authentication';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

//Componente que engloba a otros
export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    // Clear errors div after 3 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
            setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    useEffect(() => {
        async function verifyLogin(){
            const cookies = Cookies.get()
            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
                
            }

            try {
                //If token exists verify with backend
                const resVerify = await verifyTokenRequest(cookies.token)
                if(!resVerify.data){
                    setLoading(false)
                    setIsAuthenticated(false)
                    return;
                }

                setIsAuthenticated(true)
                setUser(resVerify.data)
                setLoading(false)

            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        verifyLogin();
    },[]);

    const signup = async (user) => {
        try {
            const resRegister = await registerRequest(user);
            if (resRegister.status === 200) {
                setUser(resRegister.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    
    const signin = async (user) => {
        try {
            const resSignin = await loginRequest(user);
            if (resSignin.status === 200) {
                setUser(resSignin.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return( 
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                logout,
                user,
                isAuthenticated,
                errors,
                loading,
            }}
        > 
        {children}
        </AuthContext.Provider>
    )

}