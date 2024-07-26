import React, { useState, useEffect } from 'react';
import { FaEdit, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const GestaoPontosTuristicos = () => {
    const [nome, setNome] = useState('');
    const [idLocalizacao, setIdLocalizacao] = useState('');
    const [estado, setEstado] = useState('');
    const [gastronomia, setGastronomia] = useState('');
    const [lingua, setLingua] = useState('');
    const [localizacoes, setLocalizacoes] = useState([]);
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [filteredPontos, setFilteredPontos] = useState([]);
    const [showTable, setShowTable] = useState(false); // Novo estado para controlar a exibição da tabela
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocalizacoes = async () => {
            try {
                const response = await axios.get('http://localhost/AW/localizacao/lista');
                setLocalizacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar localizações:', error);
            }
        };

        const fetchPontosTuristicos = async () => {
            try {
                const response = await axios.get('http://localhost/AW/pontos/lista');
                setPontosTuristicos(response.data);
                setFilteredPontos(response.data); // Inicialmente, mostrar todos os pontos turísticos
            } catch (error) {
                console.error('Erro ao buscar pontos turísticos:', error);
            }
        };

        fetchLocalizacoes();
        fetchPontosTuristicos();
    }, []);

    const handleFilter = () => {
        const filtered = pontosTuristicos.filter((ponto) => {
            return (
                (nome === '' || ponto.nome.toLowerCase().includes(nome.toLowerCase())) &&
                (idLocalizacao === '' || ponto.id_localizacao.toString().includes(idLocalizacao)) &&
                (estado === '' || ponto.estado.toLowerCase().includes(estado.toLowerCase())) &&
                (gastronomia === '' || ponto.gastronomia.toLowerCase().includes(gastronomia.toLowerCase())) &&
                (lingua === '' || ponto.lingua.toLowerCase().includes(lingua.toLowerCase()))
            );
        });
        setFilteredPontos(filtered);
        setShowTable(true); // Mostrar a tabela após filtrar
    };

    const handleReset = () => {
        setNome('');
        setIdLocalizacao('');
        setEstado('');
        setGastronomia('');
        setLingua('');
        setFilteredPontos(pontosTuristicos);
        setShowTable(false); // Esconder a tabela após resetar
    };

    const handleDelete = async (id) => {
        try {
            const params = new URLSearchParams();
            params.append('_method', 'DELETE');

            const response = await axios.post(`http://localhost/AW/pontos/delete/${id}`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.Dados === "Dados excluídos com Sucesso") {
                message.success('Ponto turístico excluído com sucesso');
                // Recarregar os pontos turísticos
                fetchPontosTuristicos();
            } else {
                message.error('Erro ao excluir ponto turístico');
            }
        } catch (error) {
            console.error('Erro ao excluir ponto turístico:', error);
            message.error('Erro ao excluir ponto turístico');
        }
    };

    const handleEdit = (id) => {
        navigate(`/home/editarPontoTuristico/${id}`);
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Foto',
            dataIndex: 'foto',
            key: 'foto',
            render: (foto) => (
                <img
                    src={`http://localhost/AW/${foto}`}
                    alt="Foto do ponto turístico"
                    style={{ width: '100px', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Localização',
            dataIndex: 'id_localizacao',
            key: 'id_localizacao',
            render: (text) => {
                const localizacao = localizacoes.find(loc => loc.id_localizacao === text);
                return localizacao ? localizacao.nome : 'Desconhecido';
            },
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Gastronomia',
            dataIndex: 'gastronomia',
            key: 'gastronomia',
        },
        {
            title: 'Língua',
            dataIndex: 'lingua',
            key: 'lingua',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <span>
                    <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_ponto_turistico)}>Editar</Button>
                    <Popconfirm
                        title="Você tem certeza que deseja excluir este ponto turístico?"
                        onConfirm={() => handleDelete(record.id_ponto_turistico)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" icon={<FaTrash />}>Excluir</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div className="Home block lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
            <div className='shadow'>
                <h2 className='w-full top text-base rounded flex items-center gap-2 text-[#000]'>
                    <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                        <FaMapMarkerAlt /> Filtrar Pontos Turísticos
                    </span>
                </h2>
                <div className='p-3 shadow'>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <Input
                                id='nome'
                                placeholder='Nome do ponto turístico'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="id_localizacao" className="form-label">Localização</label>
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
                        <div className="col-md-4">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <Input
                                id='estado'
                                placeholder='Estado'
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="gastronomia" className="form-label">Gastronomia</label>
                            <Input
                                id='gastronomia'
                                placeholder='Gastronomia'
                                value={gastronomia}
                                onChange={(e) => setGastronomia(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lingua" className="form-label">Língua</label>
                            <Input
                                id='lingua'
                                placeholder='Língua'
                                value={lingua}
                                onChange={(e) => setLingua(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="primary" onClick={handleFilter} className="me-2">
                        Filtrar
                    </Button>
                    <Button type="default" onClick={handleReset}>
                        Resetar
                    </Button>
                </div>
            </div>

            {showTable && ( // Renderizar a tabela apenas se showTable for verdadeiro
                <div className='mt-5 shadow'>
                    <h2 className='w-full top text-base rounded flex items-center gap-2 text-[#000]'>
                        <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                            <FaMapMarkerAlt /> Resultados da Pesquisa
                        </span>
                    </h2>
                    <Table
                        columns={columns}
                        dataSource={filteredPontos}
                        rowKey="id_ponto_turistico"
                    />
                </div>
            )}
        </div>
    );
};

export default GestaoPontosTuristicos;
