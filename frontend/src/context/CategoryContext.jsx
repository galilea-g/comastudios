import { createContext, useContext, useState, useEffect } from "react";
import {
    createCategoryRequest,
    deleteCategoryRequest,
    getCategoriesRequest,
    getCategoryRequest,
    updateCategoryRequest,
} from "../api/category";

const CategoryContext = createContext();

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategories must be used within a CategoryProvider");
    return context;
};

export function CategoryProvider({ children }) {
    const [categories, setCategory] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const getCategories = async () => {
        try {
            const res = await getCategoriesRequest();
            setCategory(res.data);
        } catch (error) {
            console.log(error);
            setErrors([...errors, error.message]);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await deleteCategoryRequest(id);
            if (res.status === 204){
                setCategory(categories.filter((category) => category._id !== id));
            }
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    };
    

    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category);
            console.log(res.data);
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    };

    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            console.log("res", res)
            return res.data;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data)
        }
    };

    const updateCategory = async (id, category) => {
        try {
            await updateCategoryRequest(id, category);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data)
        }
    };
    

    return (
        <CategoryContext.Provider
            value={{
                categories,
                getCategories,
                deleteCategory,
                createCategory,
                getCategory,
                updateCategory,
                errors,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}