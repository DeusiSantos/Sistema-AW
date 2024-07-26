import { Button, Layout, theme, Badge, Switch, Calendar } from "antd";
import { Avatar, Dropdown, Menu, Divider } from "antd";
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';
import { FaBars, FaUserCog } from "react-icons/fa"
import { useContext, useState } from "react";
import Logo from "./Logo";
import image from "./img/12.jpg"
import "./newTopBar.css";
import MenuList from "./MenuList";
import MudarTemaMenu from "./MudarTemaMenu";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, LockOutlined, LogoutOutlined, BellOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons"
import { FaAngleDown } from "react-icons/fa"
import { objectUsers } from "../Pages/script";
import { Footer } from "antd/es/layout/layout";
import { useAuth } from "../Contexts/AuthProvider/useAuth";

import { AuthContext } from "../Contexts/AuthProvider";

const { Header, Sider, Content } = Layout;
const TopBar = () => {
    const { name, avatar } = useContext(AuthContext)

    const auth = useAuth();

    function closeSession() {
        auth.logout();
    }
    const [darkTheme, setDarkTheme] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const MudarTema = () => {
        setDarkTheme(!darkTheme);
    };

    const {
        token: { colorBgContainer },

    } = theme.useToken();

    const menu = (
        <Menu theme={darkTheme ? 'dark' : "light"} className=" p-2 flex justify-center text-[#000] font-bold items-center text-center flex-col">
            <p className=" text-lg">{name}</p>
            <p className=" font-light">{objectUsers.user1.tipo}</p>


            <div className=" flex justify-center items-center gap-2 mt-3">
                <MudarTemaMenu darkTheme={darkTheme} MudarTema={MudarTema} />
            </div>
            <Divider />
            <Link to="configuracoes">
                <Menu.Item key="senha" className=" w-full flex" sucsess><SettingOutlined /> Configurações </Menu.Item>
            </Link>
            <Menu.Item onClick={closeSession} key="logout" className=" w-full" danger><LogoutOutlined /> Terminar Sessão</Menu.Item>
        </Menu>
    );

    const Notify = (
        <Menu mode="inline" className=" w-[300px] h-[314px] overflow-y-auto  p-2 flex justify-center flex-col">
            <p className=" text-sm mt-5 ">Notificação</p>
            <span className=" my-2"><hr /></span>
            <Menu.Item key="notify1" className="w-full">
                <a href="#">
                    <p className=" text-slate-400"> <span className=" text-sm text-[#000]"> Edite suas informações</span></p>
                    <p className="text-slate-400 mt-2">Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
                    <p className=" mt-2 text-slate-400">12 May, 2024</p>
                </a>
            </Menu.Item>
            <span className=" my-2"><hr /></span>
            <Menu.Item key="notify2" className="w-full">
                <a href="#">
                    <p className=" text-slate-400"> <span className=" text-sm text-[#000]">Reuniao</span></p>
                    <p className="text-slate-400 mt-2">Existem muitas variações de passagens de Lorem Ipsum disponíveis, mas a maioria sofreu.</p>
                    <p className=" mt-2 text-slate-400">13 May, 2024</p>
                </a>
            </Menu.Item>
        </Menu>
    );

    return (

        <Layout>
            <Sider width="230px" className=" shadow-md" collapsed={collapsed} trigger={null} theme={darkTheme ? 'dark' : "light"}>
                {/* <Logo /> */}
                <MenuList darkTheme={darkTheme} />
            </Sider>

            <Layout>
                <Header className="relative header2 flex justify-between items-center p-2 lg:py-2 lg:px-5" style={{ background: colorBgContainer }}>
                    <div className=" flex justify-center items-center gap-3">
                        <Button className="fecharMenu" type="text" onClick={() => { setCollapsed(!collapsed) }} style={{ borderRadius: "2px" }} icon={<FaBars style={{ fontSize: "15pt" }} />}></Button>
                        <div className=" hidden lg:block">

                        </div>
                    </div>
                    <div className=" flex justify-between items-cente gap-1">
                        <div className=" px-4 justify-center items-center flex gap-3">
                            <Dropdown overlay={Notify} placement="bottomCenter" trigger={"click"}>
                                <Badge dot={true} status="warning" color="#f20c1f" count={10}> <Button type="text" style={{ padding: 0 }}><BellOutlined style={{ fontSize: 23 }} /></Button> </Badge>
                            </Dropdown>

                        </div>
                        <div className="avatar w-full flex justify-between items-center gap-2">
                            <div className=" ml-5 hidden md:block">
                                <p>{name}</p>
                            </div>
                            <Dropdown arrow={true} overlayClassName=" w-[200px]" overlay={menu} trigger={['click']}>
                                <div className=" flex justify-center items-center cursor-pointer">
                                    <Avatar className=" cursor-pointer ml-4 lg:ml-0" src={avatar} size={40} shape="circle" icon={<FaAngleDown />} />
                                    <span className=" ml-1"><FaAngleDown /></span>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>



                <Layout>
                    <Content className=" bg-white">
                        <Outlet />
                    </Content>

                    <Footer style={{ bottom: 0, }} className="footer text-[10px] lg:text-base px-5 flex items-center justify-center">
                        <p className="text-center text-[#fff]">&copy; 2023 Sistema de Gestão Pontos Turisticos - Todos os direitos reservados</p>
                    </Footer>
                </Layout>
                {/* Restante do seu layout */}
            </Layout>
        </Layout>
    );
};

export default TopBar;