import axios from 'axios';

export async function logoutUser(){
    return axios.post("/auth/logout");
}