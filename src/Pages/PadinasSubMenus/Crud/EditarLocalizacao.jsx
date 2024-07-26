import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegStickyNote } from 'react-icons/fa';
import { notification } from 'antd';

const EditarLocalizacao = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [coordenadasGeograficas, setCoordenadasGeograficas] = useState('');

    useEffect(() => {
        const fetchLocalizacao = async () => {
            try {
                const response = await axios.get(`http://localhost/AW/localizacao/lista${id}`);
                const localizacao = response.data;

                setNome(localizacao.nome || '');
                setDescricao(localizacao.descricao || '');
                setCoordenadasGeograficas(localizacao.coordenadas_geograficas || '');
            } catch (error) {
                console.error('Erro ao buscar localização:', error);
            }
        };

        fetchLocalizacao();
    }, [id]);

    const limparFormulario = () => {
        setNome('');
        setDescricao('');
        setCoordenadasGeograficas('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('coordenadas_geograficas', coordenadasGeograficas);

        try {
            const response = await axios.post(`http://localhost/AW/localizacao/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Mensagem === "Dados atualizados com Sucesso") {
                notification.success({
                    message: 'Sucesso',
                    description: 'Localização atualizada com sucesso',
                });
                limparFormulario();
                navigate('/home/localizacoes'); // Navega de volta para a lista de localizações
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar localização',
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar localização:', error);
            notification.error({
                message: 'Erro',
                description: 'Erro ao atualizar localização',
            });
        }
    };

    return (
        <div className="Home flex lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
            <div className="w-full">
                <h2 className='text-base rounded flex items-center gap-2 text-[#000]'>
                    <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                        <FaMapMarkerAlt /> Editar Localização
                    </span>
                </h2>
                <form onSubmit={handleSubmit} className='p-4'>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
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
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descricao"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="coordenadas_geograficas" className="form-label">Coordenadas Geográficas</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="coordenadas_geograficas"
                                        placeholder="Coordenadas Geográficas"
                                        value={coordenadasGeograficas}
                                        onChange={(e) => setCoordenadasGeograficas(e.target.value)}
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

export default EditarLocalizacao;
