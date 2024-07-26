import React, { useState, useEffect } from 'react';
import { Form, Select, Button, DatePicker, notification, Modal, Layout } from 'antd';
import axios from 'axios';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';
import { Content, Footer } from 'antd/es/layout/layout';
import PublicMenu from '../../components/PublicMenu';

const { Option } = Select;
const { confirm } = Modal;

const ReservaIndex = () => {
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [user, setUser] = useState(null);
    const [tourist, setTourist] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const auth = useAuth();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                setHotels(response.data);
            } catch (error) {
                console.error('Erro ao buscar hotéis:', error);
            }
        };

        const inputStyle = {
            height: '40px',
            width: '100%',
            fontSize: '16px'
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost/AW/usuarios/lista');
                const currentUser = response.data.find(user => user.username === auth.username);
                if (currentUser) {
                    setUser(currentUser);
                    fetchTourist(currentUser.email);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        const fetchTourist = async (email) => {
            try {
                const response = await axios.get('http://localhost/AW/turistas/lista');
                const currentTourist = response.data.find(tourist => tourist.email === email);
                if (currentTourist) {
                    setTourist(currentTourist);
                }
            } catch (error) {
                console.error('Erro ao buscar turista:', error);
            }
        };

        fetchHotels();
        fetchUser();
    }, [auth.username]);

    const handleHotelChange = async (hotelId) => {
        setSelectedHotel(hotelId);
        try {
            const response = await axios.get('http://localhost/AW/quartos/lista');
            const filteredRooms = response.data.filter(room => room.id_hotel === parseInt(hotelId));
            setRooms(filteredRooms);
        } catch (error) {
            console.error('Erro ao buscar quartos:', error);
        }
    };

    const checkRoomAvailability = async (roomId, startDate, endDate) => {
        try {
            const response = await axios.get('http://localhost/AW/reservas/lista');
            const reservations = response.data.filter(reservation => reservation.id_quarto === roomId);

            const start = new Date(startDate);
            const end = new Date(endDate);

            for (const reservation of reservations) {
                const reservaStart = new Date(reservation.data_inicio);
                const reservaEnd = new Date(reservation.data_fim);

                if (
                    (start >= reservaStart && start <= reservaEnd) ||
                    (end >= reservaStart && end <= reservaEnd) ||
                    (start <= reservaStart && end >= reservaEnd)
                ) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Erro ao verificar disponibilidade do quarto:', error);
            return true;
        }
    };

    const confirmReservation = (values) => {
        const { data_inicio, data_fim, quarto } = values;
        const startDate = data_inicio.toDate();
        const endDate = data_fim.toDate();

        checkRoomAvailability(quarto, startDate, endDate).then(isOccupied => {
            if (isOccupied) {
                notification.error({
                    message: 'Erro',
                    description: 'O quarto selecionado já está ocupado para as datas escolhidas.',
                });
            } else {
                showConfirm(values);
            }
        });
    };

    const showConfirm = (values) => {
        confirm({
            title: 'Deseja confirmar a reserva?',
            content: 'Confirme as informações da reserva.',
            onOk() {
                handleSubmit(values);
            },
            onCancel() {
                console.log('Reserva cancelada');
            },
        });
    };

    const inputStyle = {
        height: '40px',
        width: '100%',
        fontSize: '16px'
    };

    const handleSubmit = async (values) => {
        const idTuristaOuUsuario = tourist ? tourist.id_turista : user.id_usuario;
        const reservaData = {
            id_turista: idTuristaOuUsuario,
            id_quarto: values.quarto,
            situacao: 'pendente',
            data_inicio: values.data_inicio.format('YYYY-MM-DD'),
            data_fim: values.data_fim.format('YYYY-MM-DD'),
            id_hotel: selectedHotel,
        };

        try {
            const response = await axios.post('http://localhost/AW/reservas/adiciona', reservaData);
            if (response.data && response.data.Dados) {
                notification.success({
                    message: 'Sucesso',
                    description: response.data.Dados,
                });
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Não foi possível inserir os dados.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Erro',
                description: 'Houve um erro ao enviar os dados.',
            });
            console.error('Houve um erro ao enviar os dados:', error);
        }
    };

    const showModal = (room) => {
        setSelectedRoom(room);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Layout>
            <PublicMenu />
            <Content className='container'>
                {/* Formulário de reserva */}
                <div className="reserva-container mt-5">
                    <h2>Fazer Reserva</h2>
                    <Form onFinish={confirmReservation} layout="vertical">
                        <div className="row">
                            <div className='col-md-4'>
                                <Form.Item name="hotel" label="Hotel" rules={[{ required: true, message: 'Por favor, selecione um hotel' }]}>
                                    <Select style={inputStyle} placeholder="Selecione um hotel" onChange={handleHotelChange}>
                                        {hotels.map(hotel => (
                                            <Option key={hotel.id_hotel} value={hotel.id_hotel}>
                                                {hotel.nome}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className='col-md-4'>
                                <Form.Item name="quarto" label="Quarto" rules={[{ required: true, message: 'Por favor, selecione um quarto' }]}>
                                    <Select style={inputStyle} placeholder="Selecione um quarto">
                                        {rooms.map(room => (
                                            <Option key={room.id_quarto} value={room.id_quarto}>
                                                Quarto {room.numero} - {room.tipo}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className='col-md-4'>
                                <Form.Item name="data_inicio" label="Data de Início" rules={[{ required: true, message: 'Por favor, selecione a data de início' }]}>
                                    <DatePicker style={inputStyle} format="YYYY-MM-DD" />
                                </Form.Item>

                            </div>
                        </div>

                        <div className="row">
                            <div className='col-md-4'>
                                <Form.Item name="data_fim" label="Data de Fim" rules={[{ required: true, message: 'Por favor, selecione a data de fim' }]}>
                                    <DatePicker style={inputStyle} format="YYYY-MM-DD" />
                                </Form.Item>

                            </div>



                        </div>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">Confirmar Reserva</Button>
                        </Form.Item>


                    </Form>
                </div>

                {/* Seção de quartos */}
                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Todos os Quartos</h2>
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
                                    <h2>Estado: Ocupado</h2>
                                    <Button type='primary' className='w-full mt-2' onClick={() => showModal(room)}>
                                        Ver detalhes
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Content>

            {/* Modal de detalhes do quarto */}
            <Modal
                title={`Detalhes do Quarto ${selectedRoom?.numero}`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedRoom && (
                    <div>
                        <p><strong>Numero:</strong> {selectedRoom.numero}</p>
                        <p><strong>Tipo:</strong> {selectedRoom.tipo}</p>
                        <p><strong>Estado:</strong> Ocupado</p>
                        <p><strong>Descrição:</strong> {selectedRoom.descricao}</p>
                        {/* Adicione mais detalhes conforme necessário */}
                    </div>
                )}
            </Modal>

            <Footer style={{ textAlign: 'center' }}>
                {/* Footer */}
            </Footer>
        </Layout>
    );
};

export default ReservaIndex;
