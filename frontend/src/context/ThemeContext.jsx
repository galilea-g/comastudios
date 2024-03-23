import { createContext, useContext, useState, useEffect } from "react";
import {
    createThemeRequest,
    deleteThemeRequest,
    getThemesRequest,
    getThemeRequest,
    updateThemeRequest,
} from "../api/themes";

const ThemeContext = createContext();

export const useThemes = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemes must be used within a ThemeProvider");
    return context;
};

export function ThemeProvider({ children }) {
    const [themes, setTheme] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const getThemes = async () => {
        try {
            const res = await getThemesRequest();
            setTheme(res.data);
        } catch (error) {
            console.log(error);
            setErrors([...errors, error.message]);
        }
    };

    const deleteTheme = async (id) => {
        try {
            const res = await deleteThemeRequest(id);
            if (res.status === 204){
                setTheme(themes.filter((theme) => theme._id !== id));
            }
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    };
    

    const createTheme = async (theme) => {
        try {
            const res = await createThemeRequest(theme);
            console.log(res.data);
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    };

    const getTheme = async (id) => {
        try {
            const res = await getThemeRequest(id);
            console.log("res", res)
            return res.data;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data)
        }
    };

    const updateTheme = async (id, theme) => {
        try {
            await updateThemeRequest(id, theme);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data)
        }
    };
    

    return (
        <ThemeContext.Provider
            value={{
                themes,
                getThemes,
                deleteTheme,
                createTheme,
                getTheme,
                updateTheme,
                errors,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}