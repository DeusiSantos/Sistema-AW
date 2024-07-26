import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, message, notification } from 'antd';
import { FaEdit, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GestaoLocalizacao = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [coordenadasGeograficas, setCoordenadasGeograficas] = useState('');
    const [localizacoes, setLocalizacoes] = useState([]);
    const [filteredLocalizacoes, setFilteredLocalizacoes] = useState([]);
    const [mostrarTabela, setMostrarTabela] = useState(false); // Estado para controlar a visibilidade da tabela
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocalizacoes = async () => {
            try {
                const response = await axios.get('http://localhost/AW/localizacao/lista');
                setLocalizacoes(response.data);
                setFilteredLocalizacoes(response.data); // Inicialmente, mostrar todas as localizações
            } catch (error) {
                console.error('Erro ao buscar localizações:', error);
            }
        };

        fetchLocalizacoes();
    }, []);

    const handleFilter = () => {
        const filtered = localizacoes.filter((localizacao) => {
            return (
                (nome === '' || localizacao.nome.toLowerCase().includes(nome.toLowerCase())) &&
                (descricao === '' || localizacao.descricao.toLowerCase().includes(descricao.toLowerCase())) &&
                (coordenadasGeograficas === '' || localizacao.coordenadas_geograficas.toLowerCase().includes(coordenadasGeograficas.toLowerCase()))
            );
        });
        setFilteredLocalizacoes(filtered);
        setMostrarTabela(true); // Mostrar tabela após pesquisa
    };

    const handleReset = () => {
        setNome('');
        setDescricao('');
        setCoordenadasGeograficas('');
        setFilteredLocalizacoes(localizacoes);
        setMostrarTabela(false); // Ocultar tabela ao resetar
    };

    const handleDelete = async (id) => {
        try {
            const params = new URLSearchParams();
            params.append('_method', 'DELETE');

            const response = await axios.post(`http://localhost/AW/localizacao/delete/${id}`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.Dados === "Dados excluídos com Sucesso") {
                message.success('Turista excluído com sucesso');
                fetchTuristas();
            } else {
                message.error('Erro ao excluir turista');
            }
        } catch (error) {
            console.error('Erro ao excluir turista:', error);
            message.error('Erro ao excluir turista');
        }
    };

    const handleEdit = (id) => {
        navigate(`/home/editarLocalizacao/${id}`);
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Coordenadas Geográficas',
            dataIndex: 'coordenadas_geograficas',
            key: 'coordenadas_geograficas',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <span>
                    <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_localizacao)}>Editar</Button>
                    <Popconfirm
                        title="Você tem certeza que deseja excluir esta localização?"
                        onConfirm={() => handleDelete(record.id_localizacao)}
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
                        <FaMapMarkerAlt /> Filtrar Localizações
                    </span>
                </h2>
                <div className='p-3 shadow'>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <Input
                                id='nome'
                                placeholder='Nome da localização'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <Input
                                id='descricao'
                                placeholder='Descrição'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="coordenadas_geograficas" className="form-label">Coordenadas Geográficas</label>
                            <Input
                                id='coordenadas_geograficas'
                                placeholder='Coordenadas Geográficas'
                                value={coordenadasGeograficas}
                                onChange={(e) => setCoordenadasGeograficas(e.target.value)}
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

            {mostrarTabela && ( // Renderizar tabela apenas quando mostrarTabela for true
                <div className='mt-5 shadow'>
                    <h2 className='w-full top text-base rounded flex items-center gap-2 text-[#000]'>
                        <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                            <FaMapMarkerAlt /> Resultados da Pesquisa
                        </span>
                    </h2>
                    <Table
                        columns={columns}
                        dataSource={filteredLocalizacoes}
                        rowKey="id_localizacao"
                    />
                </div>
            )}
        </div>
    );
};

export default GestaoLocalizacao;
