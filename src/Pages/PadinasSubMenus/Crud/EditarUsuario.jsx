    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useParams, useNavigate } from 'react-router-dom';
    import { FaUser, FaEnvelope, FaPhone, FaImage, FaLock } from 'react-icons/fa';
    import Dados2 from '../../../components/Dados2';
    import { notification } from 'antd';  // Importar notificações do Ant Design

    const EditarUsuario = () => {
        const { id } = useParams(); // Obtém o ID da URL
        const navigate = useNavigate();
        const [nome, setNome] = useState('');
        const [foto, setFoto] = useState('');
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [username, setUsername] = useState('');
        const [telefone, setTelefone] = useState('');
        const [tipo_usuario, setTipoUsuario] = useState('');

        useEffect(() => {
            const fetchUsuario = async () => {
                try {
                    const response = await axios.get(`http://localhost/AW/usuarios/lista/${id}`);
                    console.log('Dados do usuário:', response.data); // Verifica os dados recebidos
                    const user = response.data;

                    // Atualiza os estados com os dados recebidos
                    setNome(user.nome || '');
                    setFoto(user.foto || '');
                    setEmail(user.email || '');
                    setSenha(user.senha || '');
                    setUsername(user.username || '');
                    setTelefone(user.telefone || '');
                    setTipoUsuario(user.tipo_usuario || '');
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
            };

            fetchUsuario();
        }, [id]);

        const limparFormulario = () => {
            setNome('');
            setFoto('');
            setEmail('');
            setSenha('');
            setUsername('');
            setTelefone('');
            setTipoUsuario('');
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const params = new URLSearchParams();
                params.append('_method', 'PUT');
                params.append('nome', nome);
                params.append('foto', foto);
                params.append('email', email);
                params.append('senha', senha);
                params.append('username', username);
                params.append('telefone', telefone);
                params.append('tipo_usuario', tipo_usuario);

                const response = await axios.post(`http://localhost/AW/usuarios/update/${id}`, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (response.data === "Dados atualizados com Sucesso") {
                    notification.success({
                        message: 'Sucesso',
                        description: 'Usuário atualizado com sucesso',
                    });
                    limparFormulario();
                    navigate('/'); // Navega de volta para a lista de usuários
                } else {
                    notification.error({
                        message: 'Erro',
                        description: 'Erro ao atualizar usuário',
                    });
                }
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar usuário',
                });
            }
        };

        return (
            <div className="">
                <div className="w-full">
                    <Dados2 />
                </div>
                <div className="">
                    <div className='shadow'>
                    <h2 className="text-base font-semibold mb-4">Editar Reserva</h2>
                        <form onSubmit={handleSubmit} method="POST" className='p-4'>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaUser /></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nome"
                                                placeholder="Nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="foto" className="form-label">Foto (URL)</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaImage /></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="foto"
                                                placeholder="URL da Foto"
                                                value={foto}
                                                onChange={(e) => setFoto(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaEnvelope /></span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="senha" className="form-label">Senha</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaLock /></span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="senha"
                                                placeholder="Senha"
                                                value={senha}
                                                onChange={(e) => setSenha(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaUser /></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="telefone" className="form-label">Telefone</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaPhone /></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="telefone"
                                                placeholder="Telefone"
                                                value={telefone}
                                                onChange={(e) => setTelefone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label htmlFor="tipo_usuario" className="form-label">Tipo de Usuário</label>
                                        <div className="input-group">
                                            <select
                                                className="form-select"
                                                id="tipo_usuario"
                                                value={tipo_usuario}
                                                onChange={(e) => setTipoUsuario(e.target.value)}
                                            >
                                                <option value="">Selecione o tipo de usuário</option>
                                                <option value="admin">Admin</option>
                                                <option value="normal">Normal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    export default EditarUsuario;
