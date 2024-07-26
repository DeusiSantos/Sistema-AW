import { Divider } from "antd"
import Dados from "./Dados"
import { FaGlobeAfrica, FaUser, FaCubes, FaCube, FaWater, FaFilePdf, FaFile, FaChartArea, FaChartPie, FaIndustry, FaArrowUp, FaBuilding, FaCalendar } from "react-icons/fa"
import AnpgBanner from "../components/img/anpgBanner.jpeg"


const Dados2 = () => {
    const numeberTotal = (number) => {
        const formattedNumber = number >= 1000 ? `${(number / 1000).toFixed(1)}K` : number;
        return formattedNumber
    }

    return (
        <div className=" flex flex-col mt-5">
            {/* <div className=" hidden lg:block w-full">
                <img src={AnpgBanner} width="100%" height="200px" alt="" />
            </div> */}

            <div className=" shadow flex w-full mb-5 p-4 rounded-md flex-col lg:flex-row justify-center items-center gap-3">
                <div className=" w-full dados">
                    <Dados key={1} icon={<FaGlobeAfrica />} text="Pontos Turisticos" number={numeberTotal(300)} porcent="+2%" icon2={<FaArrowUp />} />
                </div>
                <div className=" w-full dados">
                    <Dados key={2} icon={< FaUser />} text="Usuarios" number={numeberTotal(200)} porcent="+2%" icon2={<FaArrowUp />} />
                </div>

                <div className=" w-full dados">
                    <Dados key={3} icon={<FaUser />} text="Turistas" number={numeberTotal(400)} porcent="+2%" icon2={<FaArrowUp />} />
                </div>

                <div className=" w-full dados">
                    <Dados key={4} icon={<FaBuilding />} text="Hotes" number={numeberTotal(100)} porcent="+2%" icon2={<FaArrowUp />} />
                </div>

                <div className=" w-full">
                    <Dados key={5} icon={<FaCalendar />} text="Reservas" number={numeberTotal(300)} porcent="+2%" icon2={<FaArrowUp />} />
                </div>
            </div>
        </div>
    )
}

export default Dados2;


