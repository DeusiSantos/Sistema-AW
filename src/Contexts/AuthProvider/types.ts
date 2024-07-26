// types.tsx
export interface IUser {
    email?: string;
    token?: string;
    username?: string;
    senha?: string;
    tipo_usuario?: string; // Adicionando o tipo de usuário
}

export interface IContext extends IUser {
    authenticate: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}
