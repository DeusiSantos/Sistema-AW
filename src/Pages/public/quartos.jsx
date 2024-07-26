import React, { useState, useEffect } from 'react';
import { Layout, Carousel, Spin, Button, Modal, Form, Input, Select, List, Typography, Space } from 'antd';
import axios from 'axios';
import PublicMenu from '../../components/PublicMenu';
import { FaStar } from 'react-icons/fa';
import "./style.css";

const { Content, Footer } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const QuartosIndex = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost/AW/quartos/lista');
                setRooms(response.data);
            } catch (error) {
                console.error('Erro ao buscar quartos:', error);
            }
        };

        fetchRooms();
    }, []);

    const showModal = async (room) => {
        setSelectedRoom(room);
        try {
            const response = await axios.get('http://localhost/AW/hoteis/lista'); // Ajuste para a URL correta dos hotéis
            const hotel = response.data.find(hotel => hotel.id_hotel === room.id_hotel);
            setSelectedHotel(hotel);
        } catch (error) {
            console.error('Erro ao buscar hotéis:', error);
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
                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Quartos Disponíveis</h2>
                    <p className='text-[15pt] mb-7 mt-2'>Todos os quartos disponíveis em nosso sistema</p>
                    <div className="flex flex-wrap justify-between">
                        {rooms.map((room) => (
                            <div key={room.id_quarto} className='w-[300px] shadow p-3 mb-5 rounded bg-[#f0f0f0]'>
                                <img
                                    src={`http://localhost/AW/${room.foto}`}
                                    alt={`Quarto ${room.numero}`}
                                    className="img-thumbnail"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div className='text-center'>
                                    <Button type='primary' className='w-full mt-2' onClick={() => showModal(room)}>
                                        Ver detalhes
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Modal
                    title={selectedRoom ? `Quarto ${selectedRoom.numero}` : ''}
                    visible={isModalVisible}
                    width={800}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Fechar
                        </Button>
                    ]}
                >
                    {selectedRoom && selectedHotel && (
                        <div>
                            <img
                                src={`http://localhost/AW/${selectedRoom.foto}`}
                                alt={`Foto do Quarto ${selectedRoom.numero}`}
                                style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '20px' }}
                            />
                            <p><strong>Número:</strong> {selectedRoom.numero}</p>
                            <p><strong>Andar:</strong> {selectedRoom.andar}</p>
                            <p><strong>Quantidade de Camas:</strong> {selectedRoom.quantidade_camas}</p>
                            <p><strong>Tipo:</strong> {selectedRoom.tipo}</p>
                            <p><strong>Facilidades:</strong> {selectedRoom.facilidades}</p>
                            <p><strong>Valor:</strong> {selectedRoom.valor}</p>
                            <p><strong>Hotel:</strong> {selectedHotel.nome}</p>
                            <img
                                src={`http://localhost/AW/${selectedHotel.foto}`}
                                alt={`Foto do Hotel ${selectedHotel.nome}`}
                                style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: '20px' }}
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

export default QuartosIndex;
