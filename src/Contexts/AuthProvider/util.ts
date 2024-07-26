import { Api  } from "../../services/api"
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null){
    localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage () {
    const json = localStorage.getItem('u')

    if(!json){
        return null;
    }

    const user = JSON.parse(json)
    return user ?? null;
}

export async function LoginRequest(userName: string, password: string) {
    try {
        const response = await fetch(`http://localhost/AW/usuarios/lista`);
        if (!response.ok) {
            throw new Error("Erro ao fazer login");
        }
        const data = await response.json();
        return data; // Retorna os dados diretamente
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error; // Propaga o erro para quem chamou a função
    }


    
}



