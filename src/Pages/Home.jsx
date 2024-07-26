// import TopBar from "../components/TopBar"
// import SideBar from "../components/SideBar"
import { Calendar } from "antd"
import Footer from "../components/Footer.jsx"
import LineChart from "../components/LineChart"
import ApexChart from "../components/LineGrapg.jsx"
import image from "../components/img/12.jpg"
import { objectUsers } from "./script.js"
import Responsivo from "../components/SliderDados.jsx"
import WeatherApp from "../components/Weather.jsx"
import AngolaMap from "../components/AngolaMap.jsx"
import Layout from "antd/es/layout/layout.js"
import LineGraph from "../components/LineGrapg.jsx"
import BasicLineChart from "../components/LineGrapg.jsx"
import Dados2 from "../components/Dados2.jsx"

import { AuthContext } from "../Contexts/AuthProvider"
import { useContext } from "react"

const Home = () => {

    const { Content } = Layout
    const {name , phone , email , avatar} = useContext(AuthContext)

    return (
   


            <div className="Home block lg:p-0 p-2  float-right lg:float-none lg:flex flex-col   m-auto lg:top-0   right-0 bottom-0">
                {/* <div className="hidden lg:flex lg:flex-row flex-col  gap-5 mt-2">
                    <Dados2 />
                </div> */}

                <div className=" w-full">
                    <Dados2 />
                </div>

                <div className=" w-full lg:gap-7 flex flex-col lg:h-[480px] lg:flex-row justify-around mt-3 ">

                    <div className=" mb-10 lg:mb-0 shadow-sm flex-col w-full lg:h-[480px]  relative z-[0] flex justify-around items-center rounded-[10px]  bg-white border-spacing-1">
                        <div className="ProfileBG w-[90%] absolute top-[10px] rounded-lg z-[1] flex justify-center items-center h-[170px]">
                            <div className="justify-center items-center flex text-center rounded-full">

                            </div>

                        </div>
                        <div className=" z-[2] text-center flex flex-col justify-center items-center">
                            <div className=" z-[2] mt-[100px] bg-white rounded-full bg-whiterounded-full flex justify-center items-center w-[140px] h-[140px]">
                                <div className="justify-center items-center flex text-center rounded-full">
                                    <img src={avatar} className=" w-[120px] rounded-full h-[120px]" alt="" srcset="" />
                                </div>

                            </div>

                            <p className=" font-semibold">{name}</p>
                            <p>{objectUsers.user1.tipo}</p>
                        </div>

                        <div className="Dados w-full text-lg lg:text-justify p-5 pt-3 flex flex-col lg:gap-3">
                            <div className="flex lg:justify-between justify-center lg:items-start items-center mb-3 lg:flex-row flex-col ">
                                <p><i class="fa-regular fa-address-card"></i> BI: </p>
                                <p className=" flex justify-between"> {objectUsers.user1.BI}</p>
                            </div>
                            <div className="flex lg:justify-between justify-center lg:items-start items-center mb-3 lg:flex-row flex-col ">
                                <p><i class="fa-solid fa-mobile-screen"></i> Contacto: </p>
                                <p className=" flex justify-between"> {phone}</p>
                            </div>
                            <div className="flex lg:justify-between justify-center lg:items-start items-center mb-3 lg:flex-row flex-col ">
                                <p><span><i class="fa-regular fa-envelope"></i> Email: </span></p>
                                <p className=" flex justify-between"> {email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 lg:mb-0  top-10 shadow-sm w-full lg:h-[480px] flex items-center justify-center rounded-md">
                        <LineChart />
                    </div>

                    <div className=" top-10 shadow-sm w-full lg:h-[480px] flex items-center justify-center rounded-md">
                        <WeatherApp />
                    </div>

                    {/* <div className="lineGraphic shadow p-3 rounded-md">
                        <ApexChart />
                    </div> */}
                </div>

                <div className="w-full lg:gap-7 flex flex-col lg:h-[480px] lg:flex-row justify-around mt-7">
                    <div className=" w-full shadow-sm h-[480px]">
                        <p className=" w-full mt-3 text-lg py-2 px-4  ">Região Nacional</p>
                        <div className=" w-full h-[80%]">
                            <AngolaMap />
                        </div>
                    </div>

                    <div className="w-full lg:gap-7 shadow-sm flex flex-col h-full lg:flex-row justify-around ">
                        <LineGraph/>
                    </div>
                    
                </div>

            </div>
      
    )
}

export default Home