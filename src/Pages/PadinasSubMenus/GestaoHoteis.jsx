import React, { useState, useEffect } from 'react';
import { FaBed, FaEdit, FaTrash } from 'react-icons/fa';
import { notification, Button, Select, Input, Table, Popconfirm } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const GestaoQuartos = () => {
  const [hoteis, setHoteis] = useState([]);
  const [hotelSelecionado, setHotelSelecionado] = useState('');
  const [numero, setNumero] = useState('');
  const [andar, setAndar] = useState('');
  const [quantidadeCamas, setQuantidadeCamas] = useState('');
  const [tipo, setTipo] = useState('');
  const [facilidades, setFacilidades] = useState('');
  const [valor, setValor] = useState('');
  const [quartos, setQuartos] = useState([]);
  const [filteredQuartos, setFilteredQuartos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoteis = async () => {
      try {
        const response = await axios.get('http://localhost/AW/hoteis/lista');
        setHoteis(response.data);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
      }
    };

    const fetchQuartos = async () => {
      try {
        const response = await axios.get('http://localhost/AW/quartos/lista');
        setQuartos(response.data);
        setFilteredQuartos(response.data); // Inicialmente, mostrar todos os quartos
      } catch (error) {
        console.error('Erro ao buscar quartos:', error);
      }
    };

    fetchHoteis();
    fetchQuartos();
  }, []);

  const handleFilter = () => {
    const filtered = quartos.filter((quarto) => {
      return (
        (hotelSelecionado === '' || quarto.id_hotel === parseInt(hotelSelecionado)) &&
        (numero === '' || quarto.numero.toLowerCase().includes(numero.toLowerCase())) &&
        (andar === '' || quarto.andar.toLowerCase().includes(andar.toLowerCase())) &&
        (quantidadeCamas === '' || quarto.quantidade_camas.toString().includes(quantidadeCamas)) &&
        (tipo === '' || quarto.tipo.toLowerCase().includes(tipo.toLowerCase())) &&
        (facilidades === '' || quarto.facilidades.toLowerCase().includes(facilidades.toLowerCase())) &&
        (valor === '' || quarto.valor.toString().includes(valor))
      );
    });
    setFilteredQuartos(filtered);
  };

  const handleReset = () => {
    setHotelSelecionado('');
    setNumero('');
    setAndar('');
    setQuantidadeCamas('');
    setTipo('');
    setFacilidades('');
    setValor('');
    setFilteredQuartos(quartos);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleEdit = (id) => {
    navigate(`/home/editarQuarto/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const params = new URLSearchParams();
      params.append('_method', 'DELETE');

      const response = await axios.post(`http://localhost/AW/quartos/delete/${id}`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.Dados === "Dados excluídos com Sucesso") {
        openNotificationWithIcon('success', 'Sucesso', 'Quarto excluído com sucesso');
        const updatedQuartos = quartos.filter(quarto => quarto.id_quarto !== id);
        setQuartos(updatedQuartos);
        setFilteredQuartos(updatedQuartos);
      } else {
        openNotificationWithIcon('error', 'Erro', 'Erro ao excluir quarto');
      }
    } catch (error) {
      console.error('Erro ao excluir quarto:', error);
      openNotificationWithIcon('error', 'Erro', 'Erro ao excluir quarto');
    }
  };

  const columns = [
    {
      title: 'Número do Quarto',
      dataIndex: 'numero',
      key: 'numero',
    },
    {
      title: 'Andar',
      dataIndex: 'andar',
      key: 'andar',
    },
    {
      title: 'Quantidade de Camas',
      dataIndex: 'quantidade_camas',
      key: 'quantidade_camas',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Facilidades',
      dataIndex: 'facilidades',
      key: 'facilidades',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (foto) => <img src={`http://localhost/AW/uploads/${foto}`} alt="Foto do Quarto" style={{ width: '100px', height: 'auto' }} />,
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(record.id_quarto)}>Editar</Button>
          <Popconfirm
            title="Você tem certeza que deseja excluir este quarto?"
            onConfirm={() => handleDelete(record.id_quarto)}
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
            <FaBed /> Filtrar Quartos
          </span>
        </h2>
        <div className='p-4'>
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="hotelSelecionado" className="form-label">Hotel</label>
              <Select
                id="hotelSelecionado"
                value={hotelSelecionado}
                onChange={(value) => setHotelSelecionado(value)}
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
              <label htmlFor="numero" className="form-label">Número do Quarto</label>
              <Input
                id="numero"
                placeholder="Digite o número do quarto"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="andar" className="form-label">Andar</label>
              <Input
                id="andar"
                placeholder="Digite o andar"
                value={andar}
                onChange={(e) => setAndar(e.target.value)}
              />
            </div>
          </div>
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="quantidadeCamas" className="form-label">Quantidade de Camas</label>
              <Input
                id="quantidadeCamas"
                placeholder="Digite a quantidade de camas"
                type="number"
                value={quantidadeCamas}
                onChange={(e) => setQuantidadeCamas(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="tipo" className="form-label">Tipo de Quarto</label>
              <Input
                id="tipo"
                placeholder="Digite o tipo de quarto"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>
          </div>
          <div className="lg:flex lg:gap-5">
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="facilidades" className="form-label">Facilidades</label>
              <Input
                id="facilidades"
                placeholder="Digite as facilidades"
                value={facilidades}
                onChange={(e) => setFacilidades(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 lg:w-1/2">
              <label htmlFor="valor" className="form-label">Valor</label>
              <Input
                id="valor"
                placeholder="Digite o valor"
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="primary" onClick={handleFilter}>Filtrar</Button>
            <Button onClick={handleReset}>Limpar Filtros</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredQuartos}
          rowKey="id_quarto"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default GestaoQuartos;
