import React, { useState, useEffect } from 'react';
import { Button, Input, Select, message, Spin } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const EditarReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [turistas, setTuristas] = useState([]);
  const [hoteis, setHoteis] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [quartosDisponiveis, setQuartosDisponiveis] = useState([]);
  const [idTurista, setIdTurista] = useState('');
  const [idHotel, setIdHotel] = useState('');
  const [idQuarto, setIdQuarto] = useState('');
  const [situacao, setSituacao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch list of tourists, hotels, and rooms
        const [turistasResponse, hoteisResponse, quartosResponse, reservaResponse] = await Promise.all([
          axios.get('http://localhost/AW/turistas/lista'),
          axios.get('http://localhost/AW/hoteis/lista'),
          axios.get('http://localhost/AW/quartos/lista'),
          axios.get(`http://localhost/AW/reservas/lista/${id}`)
        ]);

        setTuristas(turistasResponse.data);
        setHoteis(hoteisResponse.data);
        setQuartos(quartosResponse.data);
        
        const reservaData = reservaResponse.data;
        setReserva(reservaData);
        setIdTurista(reservaData.id_turista);
        setIdHotel(reservaData.id_hotel);
        setIdQuarto(reservaData.id_quarto);
        setSituacao(reservaData.situacao);
        setDataInicio(reservaData.data_inicio);
        setDataFim(reservaData.data_fim);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        message.error('Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (idHotel) {
      // Filtra os quartos com base no hotel selecionado
      const quartosFiltrados = quartos.filter(quarto => quarto.id_hotel === parseInt(idHotel, 10));
      setQuartosDisponiveis(quartosFiltrados);
    } else {
      setQuartosDisponiveis([]);
    }
  }, [idHotel, quartos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('id_turista', idTurista);
    formData.append('id_hotel', idHotel);
    formData.append('id_quarto', idQuarto);
    formData.append('situacao', situacao);
    formData.append('data_inicio', dataInicio);
    formData.append('data_fim', dataFim);

    try {
      const response = await axios.post(`http://localhost/AW/reservas/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.Dados === "Dados atualizados com Sucesso") {
        message.success('Reserva atualizada com sucesso');
        navigate('/home/reservas'); // Navega de volta para a lista de reservas
      } else {
        message.error('Erro ao atualizar reserva');
      }
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      message.error('Erro ao atualizar reserva');
    }
  };

  const handleCancel = () => {
    navigate('/home/reservas');
  };

  if (loading) {
    return <div className="center"><Spin size="large" /></div>;
  }

  return (
    <div className="container">
      <div className="shadow p-4">
        <h2 className="text-base font-semibold mb-4">Editar Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col lg:flex-row lg:gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="idTurista" className="form-label">Turista</label>
                <Select
                  id="idTurista"
                  value={idTurista}
                  onChange={setIdTurista}
                  placeholder="Selecione o turista"
                  style={{ width: '100%' }}
                >
                  <Option value="">Selecione o turista</Option>
                  {turistas.map(turista => (
                    <Option key={turista.id_turista} value={turista.id_turista}>{turista.nome}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex-1">
                <label htmlFor="idHotel" className="form-label">Hotel</label>
                <Select
                  id="idHotel"
                  value={idHotel}
                  onChange={value => {
                    setIdHotel(value);
                    setIdQuarto(''); // Reset quarto when hotel changes
                  }}
                  placeholder="Selecione o hotel"
                  style={{ width: '100%' }}
                >
                  <Option value="">Selecione o hotel</Option>
                  {hoteis.map(hotel => (
                    <Option key={hotel.id_hotel} value={hotel.id_hotel}>{hotel.nome}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="idQuarto" className="form-label">Quarto</label>
                <Select
                  id="idQuarto"
                  value={idQuarto}
                  onChange={setIdQuarto}
                  placeholder="Selecione o quarto"
                  style={{ width: '100%' }}
                >
                  <Option value="">Selecione o quarto</Option>
                  {quartosDisponiveis.map(quarto => (
                    <Option key={quarto.id_quarto} value={quarto.id_quarto}>{quarto.numero}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex-1">
                <label htmlFor="situacao" className="form-label">Situação</label>
                <Input
                  id="situacao"
                  placeholder="Digite a situação"
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="dataInicio" className="form-label">Data de Início</label>
                <Input
                  id="dataInicio"
                  type="date"
                  placeholder="Digite a data de início"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="dataFim" className="form-label">Data de Fim</label>
                <Input
                  id="dataFim"
                  type="date"
                  placeholder="Digite a data de fim"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="primary" htmlType="submit">Salvar</Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarReserva;
