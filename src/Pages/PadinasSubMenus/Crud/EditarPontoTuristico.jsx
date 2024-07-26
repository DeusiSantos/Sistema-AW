import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegStickyNote, FaCubes } from 'react-icons/fa';
import { notification } from 'antd';

const EditarPontosTuristicos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [idLocalizacao, setIdLocalizacao] = useState('');
    const [estado, setEstado] = useState('');
    const [gastronomia, setGastronomia] = useState('');
    const [lingua, setLingua] = useState('');
    const [foto, setFoto] = useState(null);
    const [localizacoes, setLocalizacoes] = useState([]);
    const [fotoAtual, setFotoAtual] = useState('');

    useEffect(() => {
        const fetchLocalizacoes = async () => {
            try {
                const response = await axios.get('http://localhost/AW/localizacao/lista');
                setLocalizacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar localizações:', error);
            }
        };

        fetchLocalizacoes();
    }, []);

    useEffect(() => {
        const fetchPontoTuristico = async () => {
            try {
                const response = await axios.get(`http://localhost/AW/pontos/${id}`);
                const ponto = response.data;

                setNome(ponto.nome || '');
                setIdLocalizacao(ponto.id_localizacao || '');
                setEstado(ponto.estado || '');
                setGastronomia(ponto.gastronomia || '');
                setLingua(ponto.lingua || '');
                setFotoAtual(ponto.foto || '');
            } catch (error) {
                console.error('Erro ao buscar ponto turístico:', error);
            }
        };

        fetchPontoTuristico();
    }, [id]);

    const limparFormulario = () => {
        setNome('');
        setIdLocalizacao('');
        setEstado('');
        setGastronomia('');
        setLingua('');
        setFoto(null);
        setFotoAtual('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nome', nome);
        formData.append('id_localizacao', idLocalizacao);
        formData.append('estado', estado);
        formData.append('gastronomia', gastronomia);
        formData.append('lingua', lingua);
        if (foto) formData.append('foto', foto);

        try {
            const response = await axios.post(`http://localhost/AW/pontos/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Mensagem === "Dados atualizados com Sucesso") {
                notification.success({
                    message: 'Sucesso',
                    description: 'Ponto turístico atualizado com sucesso',
                });
                limparFormulario();
                navigate('/home/pontos-turisticos'); // Navega de volta para a lista de pontos turísticos
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar ponto turístico',
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar ponto turístico:', error);
            notification.error({
                message: 'Erro',
                description: 'Erro ao atualizar ponto turístico',
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
                        <FaCubes /> Editar Ponto Turístico
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
                                <label htmlFor="id_localizacao" className="form-label">Localização</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                                    <select
                                        className="form-select"
                                        id="id_localizacao"
                                        value={idLocalizacao}
                                        onChange={(e) => setIdLocalizacao(e.target.value)}
                                    >
                                        <option value="">Selecione a localização</option>
                                        {localizacoes.length > 0 ? (
                                            localizacoes.map((localizacao) => (
                                                <option key={localizacao.id_localizacao} value={localizacao.id_localizacao}>
                                                    {localizacao.nome}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Nenhuma localização disponível</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="estado"
                                        placeholder="Estado"
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="gastronomia" className="form-label">Gastronomia</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gastronomia"
                                        placeholder="Gastronomia"
                                        value={gastronomia}
                                        onChange={(e) => setGastronomia(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="lingua" className="form-label">Língua</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lingua"
                                        placeholder="Língua"
                                        value={lingua}
                                        onChange={(e) => setLingua(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="foto" className="form-label">Foto</label>
                                <div className="input-group">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="foto"
                                        onChange={handleFotoChange}
                                    />
                                </div>
                                {fotoAtual && (
                                    <div className="mt-2">
                                        <img src={`http://localhost/AW/${fotoAtual}`} alt="Foto atual" style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
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

export default EditarPontosTuristicos;
