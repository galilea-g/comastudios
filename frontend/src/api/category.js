import axios from "./axios";

export const getCategoriesRequest = async () => axios.get("/categories");
export const getCategoryRequest = async (id) => axios.get(`/category/${id}`);
export const createCategoryRequest = async (category) => axios.post("/category", category);
export const updateCategoryRequest = async (id,category) => axios.put(`/category/${id}`, category);
export const deleteCategoryRequest = async (id) => axios.delete(`/category/${id}`);
