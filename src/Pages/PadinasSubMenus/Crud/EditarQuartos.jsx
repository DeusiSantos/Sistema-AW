import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaImage, FaDollarSign } from 'react-icons/fa';
import { notification } from 'antd';

const EditarQuarto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotelSelecionado, setHotelSelecionado] = useState('');
    const [numero, setNumero] = useState('');
    const [andar, setAndar] = useState('');
    const [quantidadeCamas, setQuantidadeCamas] = useState('');
    const [tipo, setTipo] = useState('');
    const [facilidades, setFacilidades] = useState('');
    const [valor, setValor] = useState('');
    const [foto, setFoto] = useState(null);
    const [hoteis, setHoteis] = useState([]);

    useEffect(() => {
        const fetchQuarto = async () => {
            try {
                const response = await axios.get(`http://localhost/AW/quartos/lista/${id}`);
                const quarto = response.data;

                setHotelSelecionado(quarto.id_hotel || '');
                setNumero(quarto.numero || '');
                setAndar(quarto.andar || '');
                setQuantidadeCamas(quarto.quantidade_camas || '');
                setTipo(quarto.tipo || '');
                setFacilidades(quarto.facilidades || '');
                setValor(quarto.valor || '');
                // Manter a foto existente em um URL ou caminho
            } catch (error) {
                console.error('Erro ao buscar quarto:', error);
            }
        };

        const fetchHoteis = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                setHoteis(response.data);
            } catch (error) {
                console.error('Erro ao buscar hotéis:', error);
            }
        };

        fetchQuarto();
        fetchHoteis();
    }, [id]);

    const limparFormulario = () => {
        setHotelSelecionado('');
        setNumero('');
        setAndar('');
        setQuantidadeCamas('');
        setTipo('');
        setFacilidades('');
        setValor('');
        setFoto(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('id_hotel', hotelSelecionado);
        formData.append('numero', numero);
        formData.append('andar', andar);
        formData.append('quantidade_camas', quantidadeCamas);
        formData.append('tipo', tipo);
        formData.append('facilidades', facilidades);
        formData.append('valor', valor);
        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const response = await axios.post(`http://localhost/AW/quartos/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Mensagem === "Dados atualizados com Sucesso") {
                notification.success({
                    message: 'Sucesso',
                    description: 'Quarto atualizado com sucesso',
                });
                limparFormulario();
                navigate('/home/quartos'); // Navega de volta para a lista de quartos
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Erro ao atualizar quarto',
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar quarto:', error);
            notification.error({
                message: 'Erro',
                description: 'Erro ao atualizar quarto',
            });
        }
    };

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
        <div className="Home flex lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
            <div className="w-full">
                <h2 className='text-base rounded flex items-center gap-2 text-[#000]'>
                    <span className='bg-white gap-2 p-2 flex justify-center items-center'>
                        <FaBed /> Editar Quarto
                    </span>
                </h2>
                <form onSubmit={handleSubmit} className='p-4'>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="hotelSelecionado" className="form-label">Hotel</label>
                                <select
                                    id="hotelSelecionado"
                                    className="form-select"
                                    value={hotelSelecionado}
                                    onChange={(e) => setHotelSelecionado(e.target.value)}
                                >
                                    <option value="">Selecione o hotel</option>
                                    {hoteis.map(hotel => (
                                        <option key={hotel.id_hotel} value={hotel.id_hotel}>
                                            {hotel.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="numero" className="form-label">Número do Quarto</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="numero"
                                        placeholder="Número do Quarto"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="andar" className="form-label">Andar</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="andar"
                                        placeholder="Andar"
                                        value={andar}
                                        onChange={(e) => setAndar(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="quantidadeCamas" className="form-label">Quantidade de Camas</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantidadeCamas"
                                        placeholder="Quantidade de Camas"
                                        value={quantidadeCamas}
                                        onChange={(e) => setQuantidadeCamas(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="tipo" className="form-label">Tipo de Quarto</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tipo"
                                        placeholder="Tipo de Quarto"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="facilidades" className="form-label">Facilidades</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaBed /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="facilidades"
                                        placeholder="Facilidades"
                                        value={facilidades}
                                        onChange={(e) => setFacilidades(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="valor" className="form-label">Valor</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaDollarSign /></span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="valor"
                                        placeholder="Valor"
                                        value={valor}
                                        onChange={(e) => setValor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="foto" className="form-label">Foto</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="foto"
                                    onChange={handleFotoChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarQuarto;
