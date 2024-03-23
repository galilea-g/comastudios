import axios from "./axios";

export const getThemesRequest = async () => axios.get("/themes");
export const getThemeRequest = async (id) => axios.get(`/theme/${id}`);
export const createThemeRequest = async (theme) => axios.post("/theme", theme);
export const updateThemeRequest = async (id,theme) => axios.put(`/theme/${id}`, theme);
export const deleteThemeRequest = async (id) => axios.delete(`/theme/${id}`);
