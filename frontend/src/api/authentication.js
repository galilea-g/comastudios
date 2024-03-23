import axios from './axios'

//credentials - property of axios, set cookie when  making request to server

export const registerRequest = user => axios.post(`/auth/register`, user)
export const loginRequest = user => axios.post(`/auth/login`, user)
export const verifyTokenRequest = () => axios.post('/auth/verify') //checks if token is valid