import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { notification } from "antd";
import { useAuth } from "../Contexts/AuthProvider/useAuth";
import googleLogo from "../components/img/google.png";
import logo from "../components/img/Logo.png";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onFinish = async (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            notification.info({
                message: 'Erro de Login',
                description: 'Por favor, preencha todos os campos.',
            });
        } else {
            try {
                await auth.authenticate(username, password);
                // O redirecionamento é tratado na função authenticate
            } catch (error) {
                notification.error({
                    message: 'Erro de Login',
                    description: 'Nome de usuário ou senha inválidos.',
                });
            }
        }
    };

    return (
        <form onSubmit={onFinish}>
            <div className="login w-full h-[100vh] flex justify-center items-center">
                <div className="lg:shadow-md lg:rounded flex justify-center items-center w-full h-full lg:w-[1024px] lg:h-[500px]">
                    <div className="lg:flex-row flex-col flex w-full h-full justify-between items-center lg:p-2">
                        <div className="img2 lg:rounded-[10px] flex justify-center items-center w-full h-[300px] lg:h-[100%]">
                            <div className="gradient lg:rounded-[10px] flex justify-center items-center p-5 w-full h-[300px] lg:h-[100%]">
                                <div className="text-center relative">
                                    <h1 className="text-[#fff] font-bold text-3xl lg:text-5xl mb-3">Bem-vindo de volta</h1>
                                    <div className="text-[#fff] text-xl">
                                        <p>Por favor, faça o login digitando seu nome de usuário e senha.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center form lg:w-[100%] h-[100%]">
                            <div className="img flex justify-center items-center flex-col">
                                {/* <img className="my-3" src={logo} width="30%" alt="Logo" /> */}
                                LOGO
                                <p>Entre com os seus dados</p>
                            </div>
                            <div className="inputs">
                                <div className="input flex justify-between items-center">
                                    <span><FaUser /></span>
                                    <input
                                        type="text"
                                        className="w-[90%] bg-transparent"
                                        placeholder="Digite nome de usuário"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="inputs">
                                <div className="input flex justify-between items-center">
                                    <span><FaLock /></span>
                                    <input
                                        type="password"
                                        className="w-[90%] bg-transparent"
                                        placeholder="Digite a senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex w-[350px] justify-center items-center">
                                <button type="submit" className="button w-full text-white font-medium p-3 rounded-md mt-2">Entrar</button>
                            </div>
                            <div className="w-[350px] my-3">
                                <Link to="/recuperarSenha" className="flex justify-end items-start">
                                    <p className="recuperaSenha text-end w-full">Esqueceu a Senha?</p>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <hr />
                                <span className="text-[#363636]">ou</span>
                                <hr />
                            </div>
                            <div className="w-[350px]">
                                <button className="google shadow-sm rounded-[10px] flex w-full justify-center gap-3 items-center p-[10px]">
                                    <img src={googleLogo} alt="Google Logo" /> Entrar com Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
