import api from "./api";
import { jwtDecode } from "jwt-decode";

export async function login(username, password) {
    const response = await api.get(`/users?username=${username}&password=${password}`);
    const user = response.data[0];
    if(!user) {
        throw new Error("Invalid credentials");
    }
    const token = btoa(JSON.stringify({ id: user.id, username: user.username, role: user.role}));
    localStorage.setItem("token", token);
    return JSON.parse(atob(token));
}

export function logout() {
    localStorage.removeItem("token");
}

export function getUser() {
    const token = localStorage.getItem("token");
    if(!token) {
        return null;
    }
    return jwtDecode(token);

}