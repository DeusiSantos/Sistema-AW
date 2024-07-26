import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Input, Button, Select, Form, message, Popconfirm } from 'antd';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const GestaoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        tipo_usuario: '',
    });
    const [showResults, setShowResults] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsuarios(); // Atualiza a lista de usuários ao carregar o componente
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost/AW/usuarios/lista');
            setUsuarios(response.data);
            setFilteredUsuarios(response.data); // Inicialmente, o filtro é igual a todos os usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleChange = (changedFields) => {
        setFormData({
            ...formData,
            ...changedFields
        });
    };

    const handleFilter = () => {
        const filtered = usuarios.filter((usuario) => {
            return (
                (formData.nome === '' || usuario.nome.toLowerCase().includes(formData.nome.toLowerCase())) &&
                (formData.email === '' || usuario.email.toLowerCase().includes(formData.email.toLowerCase())) &&
                (formData.tipo_usuario === '' || usuario.tipo_usuario === formData.tipo_usuario)
            );
        });
        setFilteredUsuarios(filtered);
        setShowResults(true);
    };

    const handleReset = () => {
        formRef.current.resetFields();
        setFormData({
            nome: '',
            email: '',
            tipo_usuario: '',
        });
        setFilteredUsuarios(usuarios); // Resetar para todos os usuários
        setShowResults(false);
    };

    const handleDelete = async (id) => {
        try {
            const params = new URLSearchParams();
            params.append('_method', 'DELETE');

            const response = await axios.post(`http://localhost/AW/usuarios/delete/${id}`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log('Delete Response:', response.data); // Adiciona um console.log para debug

            if (response.data.Dados === "Dados excluídos com Sucesso") {
                message.success('Usuário excluído com sucesso');
                fetchUsuarios(); // Atualiza a lista de usuários após a exclusão
            } else {
                message.error('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            message.error('Erro ao excluir usuário');
        }
    };

    const handleEdit = (id) => {
        navigate(`/home/editar/${id}`); // Navega para a página de edição com o ID do usuário
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'Tipo de Usuário',
            dataIndex: 'tipo_usuario',
            key: 'tipo_usuario',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <span>
                    <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_usuario)}>Editar</Button>
                    <Popconfirm
                        title="Você tem certeza que deseja excluir este usuário?"
                        onConfirm={() => handleDelete(record.id_usuario)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" icon={<FaTrash />}>Excluir</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const dataSource = filteredUsuarios.map((usuario, index) => ({
        key: index,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo_usuario: usuario.tipo_usuario,
        id_usuario: usuario.id_usuario,
    }));

    return (
        <div className=''>
            <div className="Home flex lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
                <div className="w-full">
                    <h2 className='w-full top text-base rounded flex items-center gap-2 text-[#000]'>
                        <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                            <FaUser /> Lista de Usuários
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
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            placeholder="Email"
                                            onChange={(e) => handleChange({ email: e.target.value })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item label="Tipo de Usuário" name="tipo_usuario">
                                        <Select
                                            placeholder="Selecione o Tipo de Usuário"
                                            onChange={(value) => handleChange({ tipo_usuario: value })}
                                        >
                                            <Option value="">Todos</Option>
                                            <Option value="admin">Admin</Option>
                                            <Option value="normal">Normal</Option>
                                        </Select>
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

export default GestaoUsuarios;
