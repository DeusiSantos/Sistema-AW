import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Dados from './Dados';
import { FaGlobeAfrica, FaUser, FaCubes, FaCube, FaWater, FaFilePdf, FaFile, FaChartArea, FaChartPie, FaIndustry } from "react-icons/fa"
import {ArrowUpOutlined} from "@ant-design/icons"
import Dados2 from './Dados2';

const Responsivo = () => {
    const numeberTotal = (number) => {
        const formattedNumber = number >= 1000 ? `${(number / 1000).toFixed(1)}K` : number;
        return formattedNumber;
    };

    return (
        <div className=' w-full'>
            {/* <AliceCarousel
                autoPlay
                autoPlayInterval={6000}
                infinite={true}
                buttonsDisabled={true}
                // disableButtonsControls
                items={[
                    <Dados key={1} icon={<FaGlobeAfrica />} text="Bacias" number={numeberTotal(300000)} porcent="+2%"icon2={<ArrowUpOutlined />} />,
                    <Dados key={2} icon={< FaUser />} text="Operadores" number={numeberTotal(200000)} porcent="+2%"icon2={<ArrowUpOutlined />} />,
                    <Dados key={3} icon={<FaCubes />} text="Blocos" number={numeberTotal(400000)} porcent="+2%"icon2={<ArrowUpOutlined />} />,
                    <Dados key={4} icon={<FaIndustry />} text="Plataformas" number={numeberTotal(1000)} porcent="+2%"icon2={<ArrowUpOutlined />} />,
                    <Dados key={5} icon={<FaWater />} text="Poços" number={numeberTotal(300000)} porcent="+2%"icon2={<ArrowUpOutlined />} />
                ]}
                responsive={{
                    0: { items: 1 },
                    600: { items: 2 },
                    960: { items: 3 },
                    1200: { items: 4 }
                }}
            /> */}

            <Dados2 />
        </div>
    );
};

export default Responsivo;
