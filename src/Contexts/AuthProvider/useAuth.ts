import { useContext } from "react"
import { AuthContext } from "."
9
export const useAuth = () => {
    const context = useContext (AuthContext)

    return context; 
}