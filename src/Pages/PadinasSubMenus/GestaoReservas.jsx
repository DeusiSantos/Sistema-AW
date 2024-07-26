import React, { useState, useEffect } from 'react';
import { FaUser, FaBed, FaCalendarAlt, FaRegCalendarCheck, FaHotel, FaEdit, FaTrash } from 'react-icons/fa';
import { notification, Button, Select, Input, Table, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const GestaoReservas = () => {
  const [turistas, setTuristas] = useState([]);
  const [hoteis, setHoteis] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar usuários
  const [idTurista, setIdTurista] = useState('');
  const [idHotel, setIdHotel] = useState('');
  const [idQuarto, setIdQuarto] = useState('');
  const [situacao, setSituacao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Estado para controlar a visibilidade dos filtros
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar dados
    const fetchData = async () => {
      try {
        const [turistasResponse, hoteisResponse, quartosResponse, reservasResponse, usuariosResponse] = await Promise.all([
          axios.get('http://localhost/AW/turistas/lista'),
          axios.get('http://localhost/AW/hoteis/lista'),
          axios.get('http://localhost/AW/quartos/lista'),
          axios.get('http://localhost/AW/reservas/lista'),
          axios.get('http://localhost/AW/usuarios/lista') // Buscar dados de usuários
        ]);

        if (Array.isArray(turistasResponse.data) && 
            Array.isArray(hoteisResponse.data) && 
            Array.isArray(quartosResponse.data) && 
            Array.isArray(reservasResponse.data) &&
            Array.isArray(usuariosResponse.data)) {
          setTuristas(turistasResponse.data);
          setHoteis(hoteisResponse.data);
          setQuartos(quartosResponse.data);
          setReservas(reservasResponse.data);
          setUsuarios(usuariosResponse.data); // Armazenar dados de usuários
          setFilteredReservas(reservasResponse.data); // Inicialmente, mostrar todas as reservas
        } else {
          throw new Error('Alguns dos dados retornados não são arrays');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        message.error('Erro ao buscar dados');
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    if (!Array.isArray(reservas)) {
      console.error('reservas não é um array');
      return;
    }

    const filtered = reservas.filter((reserva) => {
      const reservaDataInicio = new Date(reserva.data_inicio);
      const reservaDataFim = new Date(reserva.data_fim);
      const filtroDataInicio = dataInicio ? new Date(dataInicio) : null;
      const filtroDataFim = dataFim ? new Date(dataFim) : null;

      return (
        (idTurista === '' || reserva.id_turista === parseInt(idTurista)) &&
        (idHotel === '' || reserva.id_hotel === parseInt(idHotel)) &&
        (idQuarto === '' || reserva.id_quarto === parseInt(idQuarto)) &&
        (situacao === '' || reserva.situacao.toLowerCase().includes(situacao.toLowerCase())) &&
        (!filtroDataInicio || reservaDataInicio >= filtroDataInicio) &&
        (!filtroDataFim || reservaDataFim <= filtroDataFim)
      );
    });
    setFilteredReservas(filtered);
    setShowFilters(true); // Exibir a tabela de filtros após clicar em pesquisar
  };

  const handleReset = () => {
    setIdTurista('');
    setIdHotel('');
    setIdQuarto('');
    setSituacao('');
    setDataInicio('');
    setDataFim('');
    setFilteredReservas(reservas);
    setShowFilters(false); // Ocultar a tabela de filtros ao resetar
  };

  const handleEdit = (id) => {
    navigate(`/home/editarReserva/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const params = new URLSearchParams();
      params.append('_method', 'DELETE');

      const response = await axios.post(`http://localhost/AW/reservas/delete/${id}`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.Dados === "Dados excluídos com Sucesso") {
        message.success('Reserva excluída com sucesso');
        // Atualiza a lista de reservas
        const updatedReservas = reservas.filter(reserva => reserva.id_reserva !== id);
        setReservas(updatedReservas);
        setFilteredReservas(updatedReservas);
      } else {
        message.error('Erro ao excluir reserva');
      }
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      message.error('Erro ao excluir reserva');
    }
  };

  const columns = [
    {
      title: 'Turista',
      dataIndex: 'id_turista',
      key: 'id_turista',
      render: (id) => {
        // Verifique se o id está na lista de turistas ou usuários
        const turista = turistas.find(turista => turista.id_turista === id);
        const usuario = usuarios.find(usuario => usuario.id_usuario === id);
        return turista ? turista.nome : usuario ? usuario.nome : 'Desconhecido';
      },
    },
    {
      title: 'Quarto',
      dataIndex: 'id_quarto',
      key: 'id_quarto',
      render: (id) => quartos.find(quarto => quarto.id_quarto === id)?.numero || 'Desconhecido',
    },
    {
      title: 'Hotel',
      dataIndex: 'id_hotel',
      key: 'id_hotel',
      render: (id) => hoteis.find(hotel => hotel.id_hotel === id)?.nome || 'Desconhecido',
    },
    {
      title: 'Situação',
      dataIndex: 'situacao',
      key: 'situacao',
    },
    {
      title: 'Data de Início',
      dataIndex: 'data_inicio',
      key: 'data_inicio',
    },
    {
      title: 'Data de Fim',
      dataIndex: 'data_fim',
      key: 'data_fim',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_reserva)}>Editar</Button>
          <Popconfirm
            title="Você tem certeza que deseja excluir esta reserva?"
            onConfirm={() => handleDelete(record.id_reserva)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" icon={<FaTrash />}>Excluir</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="Home block lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
      <div className='shadow'>
        <h2 className='w-ful top text-base rounded flex items-center gap-2 text-[#000]'>
          <span className='bg-white gap-2 p-2 flex justify-center items-center'>
            <FaUser /> Filtrar Reservas
          </span>
        </h2>
        <div className='p-4'>
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="idTurista" className="form-label">Turista</label>
              <Select
                id="idTurista"
                value={idTurista}
                onChange={(value) => setIdTurista(value)}
                placeholder="Selecione o turista"
                style={{ width: '100%' }}
              >
                <Option value="">Selecione o turista</Option>
                {turistas.map(turista => (
                  <Option key={turista.id_turista} value={turista.id_turista}>{turista.nome}</Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="idHotel" className="form-label">Hotel</label>
              <Select
                id="idHotel"
                value={idHotel}
                onChange={(value) => setIdHotel(value)}
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
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="idQuarto" className="form-label">Quarto</label>
              <Select
                id="idQuarto"
                value={idQuarto}
                onChange={(value) => setIdQuarto(value)}
                placeholder="Selecione o quarto"
                style={{ width: '100%' }}
              >
                <Option value="">Selecione o quarto</Option>
                {quartos.map(quarto => (
                  <Option key={quarto.id_quarto} value={quarto.id_quarto}>{quarto.numero}</Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="situacao" className="form-label">Situação</label>
              <Input
                id="situacao"
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                placeholder="Digite a situação"
              />
            </div>
          </div>
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="dataInicio" className="form-label">Data de Início</label>
              <Input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="dataFim" className="form-label">Data de Fim</label>
              <Input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="primary" onClick={handleFilter}>Pesquisar</Button>
            <Button onClick={handleReset}>Limpar Filtros</Button>
          </div>
        </div>
      </div>
      {showFilters && (
        <div className="shadow mt-4">
          <Table
            columns={columns}
            dataSource={filteredReservas}
            rowKey="id_reserva"
            pagination={{ pageSize: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default GestaoReservas;
