import React from 'react';
import { FaMapMarkerAlt, FaUser, FaWater } from 'react-icons/fa';
import { Form, Input, Button, message, Typography } from 'antd';
import axios from 'axios';
import Responsivo from '../../components/SliderDados';

const { Title } = Typography;

const Localizacao = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('nome', values.nome);
        formData.append('descricao', values.descricao);
        formData.append('coordenadas_geograficas', values.coordenadasGeograficas);

        try {
            const response = await axios.post('http://localhost/AW/localizacao/adiciona', formData);
            if (response.data && response.data.Dados) {
                message.success(response.data.Dados);
                form.resetFields(); // Resetando o formulário após o sucesso
            } else if (response.data && response.data.Erro) {
                message.error(response.data.Erro);
            } else {
                message.error('Não foi possível inserir os dados');
            }
        } catch (error) {
            message.error('Houve um erro ao enviar os dados');
            console.error('Houve um erro ao enviar os dados:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className='shadow p-4'>
                <h2 level={2} className='text-base flex items-center gap-2 my-3'>
                    Cadastrar Localização
                </h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <div className="row">
                        <div className="col-md-4">
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: 'Digite o nome da localização!' }]}
                            >
                                <Input
                                    prefix={<FaUser />}
                                    placeholder="Digite o nome da localização"
                                />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="Descrição"
                                name="descricao"
                                rules={[{ required: true, message: 'Digite a descrição da localização!' }]}
                            >
                                <Input
                                    prefix={<FaWater />}
                                    placeholder="Digite a descrição da localização"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="Coordenadas Geográficas"
                                name="coordenadasGeograficas"
                                rules={[{ required: true, message: 'Digite as coordenadas geográficas!' }]}
                            >
                                <Input
                                    prefix={<FaMapMarkerAlt />}
                                    placeholder="Digite as coordenadas geográficas"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default Localizacao;
