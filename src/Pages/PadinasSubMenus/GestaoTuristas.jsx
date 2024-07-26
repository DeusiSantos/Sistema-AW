import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Input, Button, Form, message, Popconfirm } from 'antd';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GestaoTuristas = () => {
    const [turistas, setTuristas] = useState([]);
    const [filteredTuristas, setFilteredTuristas] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        pais: '',
        endereco: '',
        telefone: '',
        nif: '',
        email: '',
    });
    const [showResults, setShowResults] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTuristas();
    }, []);

    const fetchTuristas = async () => {
        try {
            const response = await axios.get('http://localhost/AW/turistas/lista');
            setTuristas(response.data);
            setFilteredTuristas(response.data); // Inicializa com todos os turistas
        } catch (error) {
            console.error('Erro ao buscar turistas:', error);
        }
    };

    const handleChange = (changedFields) => {
        setFormData(prevState => ({
            ...prevState,
            ...changedFields
        }));
    };

    const handleFilter = () => {
        const filtered = turistas.filter((turista) => {
            return (
                (formData.nome === '' || turista.nome.toLowerCase().includes(formData.nome.toLowerCase())) &&
                (formData.pais === '' || turista.pais.toLowerCase().includes(formData.pais.toLowerCase())) &&
                (formData.endereco === '' || turista.endereco.toLowerCase().includes(formData.endereco.toLowerCase())) &&
                (formData.telefone === '' || turista.telefone.toLowerCase().includes(formData.telefone.toLowerCase())) &&
                (formData.nif === '' || turista.nif.toLowerCase().includes(formData.nif.toLowerCase())) &&
                (formData.email === '' || turista.email.toLowerCase().includes(formData.email.toLowerCase()))
            );
        });
        setFilteredTuristas(filtered);
        setShowResults(true);
    };

    const handleReset = () => {
        formRef.current.resetFields();
        setFormData({
            nome: '',
            pais: '',
            endereco: '',
            telefone: '',
            nif: '',
            email: '',
        });
        setFilteredTuristas(turistas);
        setShowResults(false);
    };

    const handleDelete = async (id) => {
        try {
            const params = new URLSearchParams();
            params.append('_method', 'DELETE');

            const response = await axios.post(`http://localhost/AW/turistas/delete/${id}`, params, {
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
        navigate(`/home/editarTurista/${id}`);
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
        },
        {
            title: 'Endereço',
            dataIndex: 'endereco',
            key: 'endereco',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'NIF',
            dataIndex: 'nif',
            key: 'nif',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <span>
                    <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_turista)}>Editar</Button>
                    <Popconfirm
                        title="Você tem certeza que deseja excluir este turista?"
                        onConfirm={() => handleDelete(record.id_turista)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" icon={<FaTrash />}>Excluir</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    // Garantir que filteredTuristas é um array
    const dataSource = Array.isArray(filteredTuristas) ? filteredTuristas.map((turista, index) => ({
        key: index,
        nome: turista.nome,
        pais: turista.pais,
        endereco: turista.endereco,
        telefone: turista.telefone,
        nif: turista.nif,
        email: turista.email,
        id_turista: turista.id_turista,
    })) : [];

    return (
        <div className=''>
            <div className="Home flex lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
                <div className="w-full">
                    <h2 className='w-full top text-base rounded flex items-center gap-2 text-[#000]'>
                        <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                            <FaUser /> Lista de Turistas
                        </span>
                    </h2>
                    <div className='shadow p-4'>
                        <Form ref={formRef} onFinish={handleFilter} layout="vertical">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <Form.Item label="Nome" name="nome">
                                        <Input
                                            placeholder="Nome"
                                            onChange={(e) => handleChange({ nome: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item label="NIF" name="nif">
                                        <Input
                                            placeholder="NIF"
                                            onChange={(e) => handleChange({ nif: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item label="Telefone" name="telefone">
                                        <Input
                                            placeholder="Telefone"
                                            onChange={(e) => handleChange({ telefone: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            placeholder="Email"
                                            onChange={(e) => handleChange({ email: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item label="País" name="pais">
                                        <Input
                                            placeholder="País"
                                            onChange={(e) => handleChange({ pais: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item label="Endereço" name="endereco">
                                        <Input
                                            placeholder="Endereço"
                                            onChange={(e) => handleChange({ endereco: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12 text-right">
                                    <Button type="primary" htmlType="submit">Filtrar</Button>
                                    <Button type="default" onClick={handleReset} className="ml-2">Resetar</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    {showResults && (
                        <Table dataSource={dataSource} columns={columns} pagination={false} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GestaoTuristas;
