import React, { useState, useEffect } from 'react';
import { FaBed, FaEdit, FaTrash } from 'react-icons/fa';
import { notification, Button, Select, Input, Table, Popconfirm, message } from 'antd';
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
  const [showTable, setShowTable] = useState(false); // Estado para controlar a visibilidade da tabela

  const navigate = useNavigate(); // Hook de navegação

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
    setShowTable(true); // Mostrar a tabela após o filtro
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
    setShowTable(false); // Ocultar a tabela após o reset
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const getHotelNameById = (id) => {
    const hotel = hoteis.find(hotel => hotel.id_hotel === id);
    return hotel ? hotel.nome : 'Desconhecido';
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
        message.success('Ponto turístico excluído com sucesso');
        // Recarregar os pontos turísticos
        fetchQuartos(); // Corrigido para chamar a função de recarregar os quartos
      } else {
        message.error('Erro ao excluir ponto turístico');
      }
    } catch (error) {
      console.error('Erro ao excluir ponto turístico:', error);
      message.error('Erro ao excluir ponto turístico');
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/editarQuartos/${id}`); // Usando o hook de navegação
  };

  const columns = [
    {
      title: 'Número do Quarto',
      dataIndex: 'numero',
      key: 'numero',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (text) => <img src={`http://localhost/AW/uploads/${text}`} alt="Foto do Quarto" style={{ width: '100px' }} />,
    },
    {
      title: 'Hotel',
      dataIndex: 'id_hotel',
      key: 'id_hotel',
      render: (id) => getHotelNameById(id),
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
          </div>
          <div className="lg:flex lg:gap-5">
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
          <Button type="primary" onClick={handleFilter} className="me-2">
            Filtrar
          </Button>
          <Button type="default" onClick={handleReset}>
            Resetar
          </Button>
        </div>
      </div>

      {showTable && ( // Mostrar tabela somente se showTable for true
        <div className='mt-5 shadow'>
          <h2 className='w-ful top text-base rounded flex items-center gap-2 text-[#000]'>
            <span className='bg-white gap-2 p-2 flex justify-center items-center'>
              <FaBed /> Resultados da Pesquisa
            </span>
          </h2>
          <Table
            columns={columns}
            dataSource={filteredQuartos}
            rowKey="id_quarto"
          />
        </div>
      )}
    </div>
  );
};

export default GestaoQuartos;
