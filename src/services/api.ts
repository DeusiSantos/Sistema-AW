import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost/AW/usuarios/lista"
})
