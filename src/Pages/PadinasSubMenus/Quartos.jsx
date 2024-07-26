import React, { useState, useEffect } from 'react';
import { FaBed, FaHotel, FaDollarSign, FaCouch, FaBuilding, FaImage } from 'react-icons/fa';
import { notification } from 'antd';
import axios from 'axios';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import Responsivo from '../../components/SliderDados';

const Quartos = () => {
  const [hoteis, setHoteis] = useState([]);
  const [hotelSelecionado, setHotelSelecionado] = useState('');
  const [numero, setNumero] = useState('');
  const [andar, setAndar] = useState('');
  const [quantidadeCamas, setQuantidadeCamas] = useState('');
  const [tipo, setTipo] = useState('');
  const [facilidades, setFacilidades] = useState('');
  const [valor, setValor] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const fetchHoteis = async () => {
      try {
        const response = await axios.get('http://localhost/AW/hoteis/lista');
        setHoteis(response.data);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
      }
    };

    fetchHoteis();
  }, []);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('numero', numero);
    formData.append('andar', andar);
    formData.append('quantidade_camas', quantidadeCamas);
    formData.append('tipo', tipo);
    formData.append('facilidades', facilidades);
    formData.append('valor', valor);
    formData.append('id_hotel', hotelSelecionado);
    formData.append('foto', foto);

    try {
      const response = await axios.post('http://localhost/AW/quartos/adiciona', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data && response.data.Dados) {
        openNotificationWithIcon('success', 'Sucesso', response.data.Dados);
      } else if (response.data && response.data.Erro) {
        openNotificationWithIcon('error', 'Erro', response.data.Erro);
      } else {
        openNotificationWithIcon('error', 'Erro', 'Não foi possível inserir os dados');
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Erro', 'Houve um erro ao enviar os dados');
      console.error('Houve um erro ao enviar os dados:', error);
    }
  };

  return (
    <div className="Home block lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
      <div className='shadow mt-4 '>
        <form className='p-4' onSubmit={handleSubmit}>
        <h2 className="title mb-4">Cadastrar Quartos</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="hotelSelecionado" className="">Hotel</label>
              <div className="input-group">
                <span className="input-group-text"><FaHotel /></span>
                <select className="form-select" id="hotelSelecionado" value={hotelSelecionado} onChange={(e) => setHotelSelecionado(e.target.value)}>
                  <option value="">Selecione o hotel</option>
                  {hoteis.map(hotel => (
                    <option key={hotel.id_hotel} value={hotel.id_hotel}>{hotel.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="numero" className="form-label">Número do Quarto</label>
              <div className="input-group">
                <span className="input-group-text"><FaBed /></span>
                <input type="text" className="form-control" id="numero" placeholder="Digite o número do quarto" value={numero} onChange={(e) => setNumero(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="andar" className="form-label">Andar</label>
              <div className="input-group">
                <span className="input-group-text"><FaBuilding /></span>
                <input type="text" className="form-control" id="andar" placeholder="Digite o andar" value={andar} onChange={(e) => setAndar(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="quantidadeCamas" className="form-label">Quantidade de Camas</label>
              <div className="input-group">
                <span className="input-group-text"><FaCouch /></span>
                <input type="number" className="form-control" id="quantidadeCamas" placeholder="Digite a quantidade de camas" value={quantidadeCamas} onChange={(e) => setQuantidadeCamas(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="tipo" className="form-label">Tipo de Quarto</label>
              <div className="input-group">
                <span className="input-group-text"><FaBed /></span>
                <input type="text" className="form-control" id="tipo" placeholder="Digite o tipo de quarto" value={tipo} onChange={(e) => setTipo(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="facilidades" className="form-label">Facilidades</label>
              <div className="input-group">
                <span className="input-group-text"><FaCouch /></span>
                <input type="text" className="form-control" id="facilidades" placeholder="Digite as facilidades" value={facilidades} onChange={(e) => setFacilidades(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="valor" className="form-label">Valor</label>
              <div className="input-group">
                <span className="input-group-text"><FaDollarSign /></span>
                <input type="number" className="form-control" id="valor" placeholder="Digite o valor" value={valor} onChange={(e) => setValor(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="foto" className="form-label">Foto</label>
              <div className="input-group">
                <span className="input-group-text"><FaImage /></span>
                <input type="file" className="form-control" id="foto" onChange={(e) => setFoto(e.target.files[0])} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Quartos;
