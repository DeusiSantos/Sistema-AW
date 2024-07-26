import React, { useState, useEffect } from 'react';
import { Layout, Carousel, Spin , Button } from 'antd';
import axios from 'axios';
import PublicMenu from '../../components/PublicMenu';
import img1 from './img/familia.jpg';
import img2 from './img/verao.jpg';
import img3 from './img/rom.jpg';
import { FaStar } from 'react-icons/fa';
import conheca from './img/conheca.svg';
import "./style.css";


const { Content, Footer } = Layout;

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [touristPoints, setTouristPoints] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchTouristPoints = async () => {
            try {
                const response = await axios.get('http://localhost/AW/pontos/lista');
                setTouristPoints(response.data);
            } catch (error) {
                console.error('Erro ao buscar pontos turísticos:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost/AW/hoteis/lista');
                // Embaralhar e selecionar apenas os 3 primeiros hotéis
                const shuffledHotels = response.data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setHotels(shuffledHotels);
            } catch (error) {
                console.error('Erro ao buscar hotéis:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTouristPoints();
        fetchHotels();
    }, []);

    return (
        <Layout className="layout">
            <PublicMenu />
            <Content className=' container'>
                <div className="site-layout-content mt-5" style={{ padding: '24px 0', minHeight: '280px' }}>
               
                        <Carousel autoplay  dots arrows >
                            {touristPoints.map((point) => (
                                <div key={point.id_ponto_turistico}>
                                    <img
                                        src={`http://localhost/AW/${point.foto}`}
                                        alt={point.nome}
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                    <h3 className="my-3 text-center font-bold text-[30pt]">{point.nome}</h3>
                                </div>
                            ))}
                        </Carousel>
                    
                </div>

                <section className="mt-5 container">
                    <h2 className='text-[40pt] font-bold'>Você Pode Gostar</h2>
                    <p className='text-[15pt] mb-7 mt-2'>Mais pontos turísticos para visitar</p>

                    <div className='w-full p-2 flex justify-between'>
                        <div className="flex-row w-[400px] bg-[#f0f0f0] shadow p-2">
                            <img src={img2} className="w-full h-[300px]" alt="Oferta de Verão" />
                            <div className="mt-2">
                                <h5 className="text-2xl">Oferta de Verão</h5>
                                <p className="mt-2">Aproveite nossas promoções de verão para destinos incríveis.</p>
                                <Button type='primary' className=' w-full mt-2'>Ver detalhes</Button>
                            </div>
                        </div>

                        <div className="flex-row w-[400px] bg-[#f0f0f0] shadow p-2">
                            <img src={img1} className="w-full h-[300px]" alt="Pacote Família" />
                            <div className="mt-2">
                                <h5 className="text-2xl">Pacote Família</h5>
                                <p className="mt-2">Planeje suas férias em família com nossos pacotes especiais.</p>
                                <Button type='primary' className=' w-full mt-2'>Ver detalhes</Button>
                            </div>
                        </div>

                        <div className="flex-row w-[400px] bg-[#f0f0f0] shadow p-2">
                            <img src={img3} className="w-full h-[300px]" alt="Escapada Romântica" />
                            <div className="mt-2">
                                <h5 className="text-2xl">Escapada Romântica</h5>
                                <p className="mt-2">Surpreenda seu amor com uma escapada romântica inesquecível.</p>
                                <Button type='primary' className=' w-full mt-2'>Ver detalhes</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-5">
                    <h2 className='text-[40pt] font-bold'>Hotéis Recomendados</h2>
                    <p className='text-[15pt] mb-7 mt-2'>Hotéis de Conforto para você e sua família</p>
                    <div className="flex justify-between">
                        {hotels.map((hotel) => (
                            <div key={hotel.id_hotel} className='w-[400px] shadow p-3 mb-5 rounded bg-[#f0f0f0]'>
                                <img
                                    src={`http://localhost/AW/${hotel.foto}`}
                                    alt={hotel.nome}
                                    className="img-thumbnail"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                />
                                <div className='text-center'>
                                    <h5 className="mb-1 mt-2 text-xl">{hotel.nome}</h5>
                                    <p className="mb-1 text-xl flex justify-center items-center gap-3">Classificação: {hotel.classificacao} <FaStar /> </p>
                                    <p className="mb-1 text-xl">Serviços: {hotel.servicos || 'Não informado'}</p>
                                    <p className="mb-1 text-xl">Quartos Disponíveis: {hotel.quartos_disponiveis}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bannerFim container flex gap">
                    <div className="texto">
                        <h1 className='text-5xl'>
                            Conheça Lugares Conosco!
                        </h1>
                        <p className='text-lg mt-4'>
                            Explore destinos incríveis, descubra culturas fascinantes e crie memórias inesquecíveis com nossa equipe especializada em turismo. Deixe-nos guiar você por uma jornada única, onde cada experiência é cuidadosamente planejada para proporcionar momentos inesquecíveis. Do planejamento à execução, estamos aqui para transformar sua viagem em uma aventura autêntica e enriquecedora. Descubra o mundo conosco e embarque em uma jornada que vai além das expectativas.
                        </p>
                    </div>

                    <div className="foto">
                        <img src={conheca} width="80%" alt="Conheça Lugares Conosco" />
                    </div>
                </div>
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

export default Index;
