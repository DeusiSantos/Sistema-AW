import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHotel, FaStar, FaCog, FaBed, FaImage } from 'react-icons/fa';
import { notification } from 'antd';

const EditarHotel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [classificacao, setClassificacao] = useState('');
    const [servicos, setServicos] = useState('');
    const [quartosDisponiveis, setQuartosDisponiveis] = useState('');
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`http://localhost/AW/hoteis/lista/${id}`);
                const hotel = response.data;

                setNome(hotel.nome || '');
                setClassificacao(hotel.classificacao || '');
                setServicos(hotel.servicos || '');
                setQuartosDisponiveis(hotel.quartos_disponiveis || '');
                setFoto(hotel.foto || '');
            } catch (error) {
                console.error('Erro ao buscar hotel:', error);
            }
        };

        fetchHotel();
    }, [id]);

    const limparFormulario = () => {
        setNome('');
        setClassificacao('');
        setServicos('');
        setQuartosDisponiveis('');
        setFoto(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nome', nome);
        formData.append('classificacao', classificacao);
        formData.append('servicos', servicos);
        formData.append('quartos_disponiveis', quartosDisponiveis);
        if (foto) formData.append('foto', foto);

        try {
            const response = await axios.post(`http://localhost/AW/hoteis/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Mensagem === "Dados atualizados com Sucesso") {
                notification.success({
                    message: 'Sucesso',
                    description: 'Hotel atualizado com sucesso',
                });
                limparFormulario();
                navigate('/home/hoteis'); // Navega de volta para a lista de hotéis
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar hotel',
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar hotel:', error);
            notification.error({
                message: 'Erro',
                description: 'Erro ao atualizar hotel',
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
                        <FaHotel /> Editar Hotel
                    </span>
                </h2>
                <form onSubmit={handleSubmit} className='p-4'>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaHotel /></span>
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
                                <label htmlFor="classificacao" className="form-label">Classificação</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaStar /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="classificacao"
                                        placeholder="Classificação"
                                        value={classificacao}
                                        onChange={(e) => setClassificacao(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="servicos" className="form-label">Serviços</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaCog /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="servicos"
                                        placeholder="Serviços"
                                        value={servicos}
                                        onChange={(e) => setServicos(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="quartos_disponiveis" className="form-label">Quartos Disponíveis</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quartos_disponiveis"
                                        placeholder="Quartos Disponíveis"
                                        value={quartosDisponiveis}
                                        onChange={(e) => setQuartosDisponiveis(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-12">
                            <div className="mb-2">
                                <label htmlFor="foto" className="form-label">Foto</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaImage /></span>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="foto"
                                        onChange={handleFotoChange}
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

export default EditarHotel;
