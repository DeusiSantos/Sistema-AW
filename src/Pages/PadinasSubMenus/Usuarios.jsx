import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Usuarios = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost/AW/usuarios/adiciona', {
                ...values
            });
            console.log(response.data);
            message.success('Usuário adicionado com sucesso!');
            form.resetFields(); // Reseta os campos do formulário após o sucesso
        } catch (error) {
            console.error('Houve um erro ao enviar os dados:', error);
            message.error('Houve um erro ao adicionar o usuário.');
        }
    };

    return (
        <div className="container">
            <div className="content shadow p-4 mt-4">
                <h2 className="title mb-4">Usuários</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="form"
                >

                    <div className="row">
                        <div className='col-md-4'>
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Nome" />
                            </Form.Item>

                        </div>

                        <div className='col-md-4'>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Por favor, insira o email!' }]}
                            >
                                <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
                            </Form.Item>

                        </div>

                        <div className='col-md-4'>
                            <Form.Item
                                label="Senha"
                                name="senha"
                                rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
                            </Form.Item>

                        </div>
                    </div>

                    <div className="row">
                        <div className='col-md-4'>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Por favor, insira o username!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>

                        </div>

                        <div className='col-md-4'>
                            <Form.Item
                                label="Telefone"
                                name="telefone"
                                rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Telefone" />
                            </Form.Item>

                        </div>


                        <div className='col-md-4'>
                            <Form.Item
                                label="Telefone"
                                name="telefone"
                                rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Telefone" />
                            </Form.Item>

                        </div>


                    </div>

                    <div className="row">
                        <div className='col-md-4'>
                            <Form.Item
                                label="Tipo de Usuário"
                                name="tipo_usuario"
                                rules={[{ required: true, message: 'Por favor, selecione o tipo de usuário!' }]}
                            >
                                <Select placeholder="Selecione o tipo de usuário">
                                    <Option value="admin">Admin</Option>
                                    <Option value="normal">Normal</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Usuarios;
