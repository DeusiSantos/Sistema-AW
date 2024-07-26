import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRegStickyNote, FaCubes } from 'react-icons/fa';
import Responsivo from '../../components/SliderDados';
import axios from 'axios';
import { notification } from 'antd';

const PontosTuristicos = () => {
    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [idLocalizacao, setIdLocalizacao] = useState('');
    const [estado, setEstado] = useState('');
    const [gastronomia, setGastronomia] = useState('');
    const [lingua, setLingua] = useState('');
    const [foto, setFoto] = useState(null);
    const [localizacoes, setLocalizacoes] = useState([]);

    useEffect(() => {
        const fetchLocalizacoes = async () => {
            try {
                const response = await axios.get('http://localhost/AW/localizacao/lista');
                // Atualize o estado localizacoes com os dados retornados pela API
                setLocalizacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar localizações:', error);
            }
        };

        fetchLocalizacoes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('id_localizacao', idLocalizacao);
        formData.append('estado', estado);
        formData.append('gastronomia', gastronomia);
        formData.append('lingua', lingua);
        if (foto) formData.append('foto', foto);

        try {
            const response = await axios.post('http://localhost/AW/pontos/adiciona', formData);
            if (response.data && response.data.Dados) {
                notification.success({
                    message: 'Sucesso',
                    description: response.data.Dados,
                });
            } else if (response.data && response.data.Erro) {
                notification.error({
                    message: 'Erro',
                    description: response.data.Erro,
                });
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Não foi possível inserir os dados',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Erro',
                description: 'Houve um erro ao enviar os dados',
            });
            console.error('Houve um erro ao enviar os dados:', error);
        }
    };

    return (
        <>
            <div className="Home block lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
                <div className='shadow mt-4'>
                    <form className='p-3 shadow' onSubmit={handleSubmit}>
                        <h2 className="title mb-4">Cadastrar Pontos Turisticos</h2>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='nome'
                                        placeholder='Nome do ponto turístico'
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="id_localizacao" className="form-label">Localização</label>
                                <div className="mb-3 input-group">
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
                            <div className="col-md-4">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='estado'
                                        placeholder='Estado'
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="gastronomia" className="form-label">Gastronomia</label>
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='gastronomia'
                                        placeholder='Gastronomia'
                                        value={gastronomia}
                                        onChange={(e) => setGastronomia(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="lingua" className="form-label">Língua</label>
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaRegStickyNote /></span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='lingua'
                                        placeholder='Língua'
                                        value={lingua}
                                        onChange={(e) => setLingua(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="foto" className="form-label">Foto</label>
                                <div className="mb-3 input-group">
                                    <input
                                        required
                                        type='file'
                                        className='form-control'
                                        id='foto'
                                        onChange={(e) => setFoto(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PontosTuristicos;
