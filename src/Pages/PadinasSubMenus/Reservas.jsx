import React, { useState, useEffect } from 'react';
import { FaUser, FaBed, FaCalendarAlt, FaRegCalendarCheck, FaHotel } from 'react-icons/fa';
import axios from 'axios';
import { message, Select, DatePicker, Form, Input, Button, Typography } from 'antd';
import moment from 'moment/moment';

const { Option } = Select;
const { Title } = Typography;

const Reservas = () => {
    const [idTurista, setIdTurista] = useState('');
    const [idQuarto, setIdQuarto] = useState('');
    const [idHotel, setIdHotel] = useState('');
    const [situacao, setSituacao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [turistas, setTuristas] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [quartos, setQuartos] = useState([]);
    const [filteredQuartos, setFilteredQuartos] = useState([]);

    useEffect(() => {
        const fetchTuristas = async () => {
            try {
                const response = await axios.get('http://localhost/AW/turistas/lista');
                setTuristas(response.data);
            } catch (error) {
                console.error('Erro ao buscar turistas:', error);
            }
        };

        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                setHotels(response.data);
            } catch (error) {
                console.error('Erro ao buscar hotéis:', error);
            }
        };

        const fetchQuartos = async () => {
            try {
                const response = await axios.get('http://localhost/AW/quartos/lista');
                setQuartos(response.data);
            } catch (error) {
                console.error('Erro ao buscar quartos:', error);
            }
        };

        fetchTuristas();
        fetchHotels();
        fetchQuartos();
    }, []);

    useEffect(() => {
        if (idHotel) {
            const filtered = quartos.filter((quarto) => quarto.id_hotel === parseInt(idHotel, 10));
            setFilteredQuartos(filtered);
        } else {
            setFilteredQuartos([]);
        }
    }, [idHotel, quartos]);

    const handleSubmit = async (values) => {
        const reservaData = {
            id_turista: values.idTurista,
            id_quarto: values.idQuarto,
            situacao: values.situacao,
            data_inicio: values.dataInicio.format('YYYY-MM-DD'),
            data_fim: values.dataFim.format('YYYY-MM-DD'),
            id_hotel: values.idHotel,
        };

        console.log(reservaData);  // Verifique os valores aqui antes do envio

        try {
            const response = await axios.post('http://localhost/AW/reservas/adiciona', reservaData);
            if (response.data && response.data.Dados) {
                message.success(response.data.Dados);
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
        <div className=' container'>
            <div className="reservas-container content shadow p-4 mt-4">
                <h2 className="title mb-4">Reservas</h2>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        idTurista,
                        idQuarto,
                        idHotel,
                        situacao,
                        dataInicio: dataInicio ? moment(dataInicio) : null,
                        dataFim: dataFim ? moment(dataFim) : null,
                    }}
                >
                    <div className="row">
                        <div className="col-md-4">
                            <Form.Item
                                label="Turista"
                                name="idTurista"
                                rules={[{ required: true, message: 'Selecione o turista!' }]}
                            >
                                <Select
                                    placeholder="Selecione o turista"
                                    onChange={(value) => setIdTurista(value)}
                                    suffixIcon={<FaUser />}
                                >
                                    {turistas.map((turista) => (
                                        <Option key={turista.id_turista} value={turista.id_turista}>
                                            {turista.nome}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="Hotel"
                                name="idHotel"
                                rules={[{ required: true, message: 'Selecione o hotel!' }]}
                            >
                                <Select
                                    placeholder="Selecione o hotel"
                                    onChange={(value) => setIdHotel(value)}
                                    suffixIcon={<FaHotel />}
                                >
                                    {hotels.map((hotel) => (
                                        <Option key={hotel.id_hotel} value={hotel.id_hotel}>
                                            {hotel.nome}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="Quarto"
                                name="idQuarto"
                                rules={[{ required: true, message: 'Selecione o quarto!' }]}
                            >
                                <Select
                                    placeholder="Selecione o quarto"
                                    onChange={(value) => setIdQuarto(value)}
                                    suffixIcon={<FaBed />}
                                >
                                    {filteredQuartos.map((quarto) => (
                                        <Option key={quarto.id_quarto} value={quarto.id_quarto}>
                                            {quarto.numero}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Form.Item
                                label="Situação"
                                name="situacao"
                                rules={[{ required: true, message: 'Digite a situação!' }]}
                            >
                                <Input
                                    placeholder="Situação"
                                    value={situacao}
                                    onChange={(e) => setSituacao(e.target.value)}
                                    prefix={<FaRegCalendarCheck />}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="Data de Início"
                                name="dataInicio"
                                rules={[{ required: true, message: 'Selecione a data de início!' }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD"
                                    onChange={(date) => setDataInicio(date)}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="Data de Fim"
                                name="dataFim"
                                rules={[{ required: true, message: 'Selecione a data de fim!' }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD"
                                    onChange={(date) => setDataFim(date)}
                                />
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

export default Reservas;
