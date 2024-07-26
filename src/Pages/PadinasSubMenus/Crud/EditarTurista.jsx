import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaImage, FaLock } from 'react-icons/fa';
import { notification } from 'antd';

const EditarTurista = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState(null);
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nif, setNif] = useState('');

    useEffect(() => {
        const fetchTurista = async () => {
            try {
                const response = await axios.get(`http://localhost/AW/turistas/lista/${id}`);
                const turista = response.data;

                setNome(turista.nome || '');
                setEmail(turista.email || '');
                setTelefone(turista.telefone || '');
                setEndereco(turista.endereco || '');
                setNif(turista.nif || '');
            } catch (error) {
                console.error('Erro ao buscar turista:', error);
            }
        };

        fetchTurista();
    }, [id]);

    const limparFormulario = () => {
        setNome('');
        setFoto(null);
        setEmail('');
        setTelefone('');
        setEndereco('');
        setNif('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('telefone', telefone);
        formData.append('endereco', endereco);
        formData.append('nif', nif);


        try {
            const response = await axios.post(`http://localhost/AW/turistas/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Mensagem === "Dados atualizados com Sucesso") {
                notification.success({
                    message: 'Sucesso',
                    description: 'Turista atualizado com sucesso',
                });
                limparFormulario();
                navigate('/home/turistas'); // Navega de volta para a lista de turistas
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar turista',
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar turista:', error);
            notification.error({
                message: 'Erro',
                description: 'Erro ao atualizar turista',
            });
        }
    };

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
        <div className="Home flex lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
            <div className="w-full">
                <h2 className='text-base rounded flex items-center gap-2 text-[#000]'>
                    <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                        <FaUser /> Editar Turista
                    </span>
                </h2>
                <form onSubmit={handleSubmit} className='p-4'>
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
                        <div className="col-md-12">
                            <div className="mb-2">
                                <label htmlFor="endereco" className="form-label">Endereço</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco"
                                        placeholder="Endereço"
                                        value={endereco}
                                        onChange={(e) => setEndereco(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-2">
                                <label htmlFor="nif" className="form-label">NIF</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaLock /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nif"
                                        placeholder="NIF"
                                        value={nif}
                                        onChange={(e) => setNif(e.target.value)}
                                    />
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
    );
};

export default EditarTurista;
