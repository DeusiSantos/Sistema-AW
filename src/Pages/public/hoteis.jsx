import React, { useState, useEffect } from 'react';
import { Layout, Carousel, Spin, Button, Modal, Form, Input, Select, List, Typography, Space } from 'antd';
import axios from 'axios';
import PublicMenu from '../../components/PublicMenu';
import { FaStar } from 'react-icons/fa';
import "./style.css";

const { Content, Footer } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const HoteisIndex = () => {
    const [loading, setLoading] = useState(true);
    const [touristPoints, setTouristPoints] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchTouristPoints = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                setTouristPoints(response.data);
            } catch (error) {
                console.error('Erro ao buscar pontos turísticos:', error);
            }
        };

        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                setHotels(response.data);
                setFilteredHotels(response.data);
            } catch (error) {
                console.error('Erro ao buscar hotéis:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTouristPoints();
        fetchHotels();
    }, []);

    const handleSearch = async (values) => {
        const { nome, classificacao, quartosDisponiveis } = values;
        try {
            const response = await axios.get('http://localhost/AW/hoteis/lista', {
                params: {
                    nome,
                    classificacao,
                    quartosDisponiveis,
                }
            });
            setFilteredHotels(response.data);
        } catch (error) {
            console.error('Erro ao filtrar hotéis:', error);
        }
    };

    const inputStyle = {
        height: '40px',
        width: '100%',
        fontSize: '16px'
    };

    const showModal = async (hotel) => {
        setSelectedHotel(hotel);
        try {
            const response = await axios.get('http://localhost/AW/quartos/lista');
            // Filtra os quartos que pertencem ao hotel selecionado
            const filteredRooms = response.data.filter(room => room.id_hotel === hotel.id_hotel);
            setRooms(filteredRooms);
        } catch (error) {
            console.error('Erro ao buscar quartos:', error);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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

                {/* Formulário de filtro */}
                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Filtrar Hotéis</h2>
                    <Form onFinish={handleSearch} layout="vertical" className="mb-5">
                        <div className="row">
                            <div className='col-md-4'>
                                <Form.Item name="nome" label="Nome do Hotel">
                                    <Input style={inputStyle} placeholder="Digite o nome do hotel" />
                                </Form.Item>

                            </div>

                            <div className='col-md-4'>
                                <Form.Item name="classificacao" label="Classificação">
                                    <Select style={inputStyle} placeholder="Selecione a classificação">
                                        <Option value="">Todas</Option>
                                        <Option value="1">1 Estrela</Option>
                                        <Option value="2">2 Estrelas</Option>
                                        <Option value="3">3 Estrelas</Option>
                                        <Option value="4">4 Estrelas</Option>
                                        <Option value="5">5 Estrelas</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className='col-md-4'>
                                <Form.Item name="quartosDisponiveis" label="Quartos Disponíveis">
                                    <Select style={inputStyle} placeholder="Selecione a quantidade">
                                        <Option value="">Todos</Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5+</Option>
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
                    <h2 className='text-[40pt] font-bold'>Hotéis Disponiveis</h2>
                    <p className='text-[15pt] mb-7 mt-2'>Hotéis de Conforto para você e sua família</p>
                    <div className="flex flex-wrap justify-between">
                        {filteredHotels.map((hotel) => (
                            <div key={hotel.id_hotel} className='w-[400px] shadow p-3 mb-5 rounded bg-[#f0f0f0]'>
                                <img
                                    src={`http://localhost/AW/${hotel.foto}`}
                                    alt={hotel.nome}
                                    className="img-thumbnail"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                />
                                <div className='text-center'>
                                    <h5 className="mb-1 mt-2 text-xl">{hotel.nome}</h5>
                                    <p className="mb-1 text-xl flex justify-center items-center gap-3">
                                        Classificação: {hotel.classificacao} <FaStar />
                                    </p>
                                    <p className="mb-1 text-xl">Quartos Disponíveis: {hotel.quartos_disponiveis}</p>

                                    <div className='mt-3'>
                                        <Button type='primary' className='w-full mt-2' onClick={() => showModal(hotel)}>
                                            Ver detalhes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Modal
                    title={selectedHotel ? selectedHotel.nome : ''}
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
                    {selectedHotel && (
                        <div>
                            <img
                                src={`http://localhost/AW/${selectedHotel.foto}`}
                                alt={selectedHotel.nome}
                                style={{ width: '100%', height: '500px', objectFit: 'cover', marginBottom: '20px' }}
                            />
                            <p><strong>Nome:</strong> {selectedHotel.nome}</p>
                            <p><strong>Classificação:</strong> {selectedHotel.classificacao} <FaStar /></p>
                            <p><strong>Serviços:</strong> {selectedHotel.servicos || 'Não informado'}</p>
                            <p><strong>Quartos Disponíveis:</strong> {selectedHotel.quartos_disponiveis}</p>
                            <Title level={3}>Quartos Disponíveis</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={rooms}
                                renderItem={room => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<img
                                                src={`http://localhost/AW/${room.foto}`}
                                                alt={`Foto do Quarto ${room.numero}`}
                                                style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                                            />}
                                            title={`Número: ${room.numero}`}
                                            description={
                                                <Space direction="vertical">
                                                    <Text><strong>Andar:</strong> {room.andar}</Text>
                                                    <Text><strong>Quantidade de Camas:</strong> {room.quantidade_camas}</Text>
                                                    <Text><strong>Tipo:</strong> {room.tipo}</Text>
                                                    <Text><strong>Facilidades:</strong> {room.facilidades}</Text>
                                                    <Text><strong>Valor:</strong> {room.valor}</Text>
                                                </Space>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
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

export default HoteisIndex;
