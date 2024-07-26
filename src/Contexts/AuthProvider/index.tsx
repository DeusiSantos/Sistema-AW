import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './util';
import { notification } from 'antd';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>(getUserLocalStorage());

    useEffect(() => {
        const storedUser = getUserLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    async function authenticate(username: string, password: string) {
        try {
            const userData = await LoginRequest(username, password);
            const user = userData.find((u: IUser) => u.username === username && u.senha === password);
            
            if (user) {
                setUser(user);
                setUserLocalStorage(user);

                if (user.tipo_usuario === 'admin') {
                    window.location.href = '/home'; // Redireciona para o painel admin
                } else if (user.tipo_usuario === 'normal') {
                    window.location.href = '/'; // Redireciona para o painel normal
                }
            } else {
                notification.error({
                    message: 'Erro de Login',
                    description: 'Nome de usuário ou senha inválidos.',
                });
            }
        } catch (error) {
            console.error("Erro ao autenticar usuário:", error);
            notification.error({
                message: 'Erro de Login',
                description: 'Ocorreu um erro ao tentar autenticar.',
            });
        }
    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
