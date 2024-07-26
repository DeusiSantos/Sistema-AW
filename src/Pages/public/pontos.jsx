import React, { useState, useEffect } from 'react';
import { Layout, Carousel, Spin, Button, Modal, Form, Input, Select, List, Typography, Space } from 'antd';
import axios from 'axios';
import PublicMenu from '../../components/PublicMenu';
import { FaStar } from 'react-icons/fa';
import "./style.css";

const { Content, Footer } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const Pontos = () => {
    const [loading, setLoading] = useState(true);
    const [touristPoints, setTouristPoints] = useState([]);
    const [filteredTouristPoints, setFilteredTouristPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchTouristPoints = async () => {
            try {
                const response = await axios.get('http://localhost/AW/pontos/lista');
                setTouristPoints(response.data);
                setFilteredTouristPoints(response.data);
            } catch (error) {
                console.error('Erro ao buscar pontos turísticos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTouristPoints();
    }, []);

    const handleSearch = async (values) => {
        const { nome, estado, gastronomia, lingua } = values;
        try {
            const response = await axios.get('http://localhost/AW/pontos/lista', {
                params: {
                    nome,
                    estado,
                    gastronomia,
                    lingua,
                }
            });
            setFilteredTouristPoints(response.data);
        } catch (error) {
            console.error('Erro ao filtrar pontos turísticos:', error);
        }
    };

    const showModal = (point) => {
        setSelectedPoint(point);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const inputStyle = {
        height: '40px',
        width: '100%',
        fontSize: '16px'
    };

    return (
        <Layout className="layout">
            <PublicMenu />
            <Content className='container'>
                <div className="site-layout-content" style={{ padding: '24px 0', minHeight: '500px' }}>
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Carousel autoplay dots arrows>
                            {touristPoints.map((point) => (
                                <div key={point.id_ponto_turistico}>
                                    <img
                                        src={`http://localhost/AW/${point.foto}`}
                                        alt={point.nome}
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                    <h3 className="my-3 text-center font-bold text-[30pt]">{point.nome}</h3>
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>

                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Filtrar Pontos Turísticos</h2>
                    <Form onFinish={handleSearch} layout="vertical" className="mb-5">
                        <div className='row'>
                            <div className='col-md-4'>
                                <Form.Item name="nome" label="Nome do Ponto Turístico">
                                    <Input style={inputStyle} placeholder="Digite o nome do ponto turístico" />
                                </Form.Item>
                            </div>

                            <div className='col-md-4'>
                                <Form.Item name="lingua" label="Língua">
                                    <Select style={inputStyle} placeholder="Selecione a língua">
                                        <Option value="">Todas</Option>
                                        <Option value="portugues">Português</Option>
                                        <Option value="ingles">Inglês</Option>
                                        <Option value="espanhol">Espanhol</Option>
                                        {/* Adicione mais opções conforme necessário */}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">Buscar</Button>
                        </Form.Item>
                    </Form>
                </section>

                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Pontos Turísticos Disponíveis</h2>
                    <p className='text-[15pt] mb-7 mt-2'>Explore sempre</p>
                    <div className="flex flex-wrap justify-between">
                        {filteredTouristPoints.length ? (
                            filteredTouristPoints.map((point) => (
                                <div key={point.id_ponto_turistico} className='w-[400px] shadow p-3 mb-5 rounded bg-[#f0f0f0]'>
                                    <img
                                        src={`http://localhost/AW/${point.foto}`}
                                        alt={point.nome}
                                        className="img-thumbnail"
                                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    />
                                    <div className='text-center'>

                                        <div className='mt-3'>
                                            <Button type='primary' className='w-full mt-2' onClick={() => showModal(point)}>
                                                Ver detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum ponto turístico encontrado.</p>
                        )}
                    </div>
                </section>

                <Modal
                    title={selectedPoint ? selectedPoint.nome : ''}
                    visible={isModalVisible}
                    width={1200}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Fechar
                        </Button>
                    ]}
                >
                    {selectedPoint && (
                        <div>
                            <img
                                src={`http://localhost/AW/${selectedPoint.foto}`}
                                alt={selectedPoint.nome}
                                style={{ width: '100%', height: '500px', objectFit: 'cover', marginBottom: '20px' }}
                            />
                            <p><strong>Nome:</strong> {selectedPoint.nome}</p>
                            <p><strong>Estado:</strong> {selectedPoint.estado}</p>
                            <p><strong>Gastronomia:</strong> {selectedPoint.gastronomia}</p>
                            <p><strong>Língua:</strong> {selectedPoint.lingua}</p>
                            <p><strong>Descrição:</strong> {selectedPoint.descricao || 'Não informado'}</p>
                        </div>
                    )}
                </Modal>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <footer className="bg-light text-center text-lg-start mt-5">
                    <div className="container p-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 mb-4">
                                <h5 className="text-uppercase">Meu Site de Turismo</h5>
                                <p>Oferecendo os melhores destinos, hotéis e experiências de turismo para você.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <h5 className="text-uppercase">Links Úteis</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><a href="#!" className="text-dark">Home</a></li>
                                    <li><a href="#!" className="text-dark">Turismo</a></li>
                                    <li><a href="#!" className="text-dark">Hotéis</a></li>
                                    <li><a href="#!" className="text-dark">Reservas</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <h5 className="text-uppercase">Contato</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><a href="#!" className="text-dark">Fale Conosco</a></li>
                                    <li><a href="#!" className="text-dark">Suporte</a></li>
                                    <li><a href="#!" className="text-dark">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-light">
                        © 2024 Meu Site de Turismo
                    </div>
                </footer>
            </Footer>
        </Layout>
    );
};

export default Pontos;
