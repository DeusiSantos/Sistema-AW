import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, IdcardOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';

const Turistas = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost/AW/turistas/adiciona', values);
            if (response.data && response.data.Dados) {
                message.success('Sucesso: ' + response.data.Dados);
            } else {
                message.error('Não foi possível inserir os dados');
            }
            form.resetFields(); // Reseta os campos do formulário após o sucesso
        } catch (error) {
            message.error('Houve um erro ao enviar os dados');
            console.error('Houve um erro ao enviar os dados:', error);
        }
    };

    return (
        <div className="container">
            <div className="content shadow p-4 mt-4">
                <h2 className="title mb-4">Cadastrar Turistas</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="form"
                >
                    <div className="row">
                        <div className="col-md-4">
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Nome" />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="NIF (Número de Identificação Fiscal)"
                                name="nif"
                                rules={[{ required: true, message: 'Por favor, insira o NIF!' }]}
                            >
                                <Input prefix={<IdcardOutlined />} placeholder="NIF" />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Por favor, insira o email!' }]}
                            >
                                <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="País"
                                name="pais"
                                rules={[{ required: true, message: 'Por favor, insira o país!' }]}
                            >
                                <Input prefix={<GlobalOutlined />} placeholder="País" />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="Endereço"
                                name="endereco"
                                rules={[{ required: true, message: 'Por favor, insira o endereço!' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Endereço" />
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

export default Turistas;
