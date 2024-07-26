import React, { useState } from 'react';
import { FaHotel, FaStar, FaConciergeBell, FaBed, FaImage } from 'react-icons/fa';
import { notification } from 'antd';
import axios from 'axios';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import Responsivo from '../../components/SliderDados';

const Hoteis = () => {
  const [nome, setNome] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [servicos, setServicos] = useState("");
  const [quartosDisponiveis, setQuartosDisponiveis] = useState("");
  const [foto, setFoto] = useState(null);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('classificacao', classificacao);
    formData.append('servicos', servicos);
    formData.append('quartos_disponiveis', quartosDisponiveis);
    formData.append('foto', foto);

    try {
      const response = await axios.post('http://localhost/AW/hoteis/adiciona', formData, {
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
    <div className="">
      <div className="Home block lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
        <div className=' shadow mt-4'>
          <form className='p-4' onSubmit={handleSubmit}>
            <h2 className="title mb-4">Cadastrar Hoteis</h2>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="nome" className="form-label">Nome do Hotel</label>
                <div className="input-group">
                  <span className="input-group-text"><FaHotel /></span>
                  <input type="text" className="form-control" id="nome" placeholder="Digite o nome do hotel" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="classificacao" className="form-label">Classificação</label>
                <div className="input-group">
                  <span className="input-group-text"><FaStar /></span>
                  <input type="number" className="form-control" id="classificacao" placeholder="Digite a classificação" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="servicos" className="form-label">Serviços</label>
                <div className="input-group">
                  <span className="input-group-text"><FaConciergeBell /></span>
                  <input type="text" className="form-control" id="servicos" placeholder="Digite os serviços" value={servicos} onChange={(e) => setServicos(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="quartosDisponiveis" className="form-label">Quartos Disponíveis</label>
                <div className="input-group">
                  <span className="input-group-text"><FaBed /></span>
                  <input type="number" className="form-control" id="quartosDisponiveis" placeholder="Digite a quantidade de quartos disponíveis" value={quartosDisponiveis} onChange={(e) => setQuartosDisponiveis(e.target.value)} />
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
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hoteis;
