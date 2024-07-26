import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined, BarsOutlined, AreaChartOutlined, PayCircleOutlined, PlusOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { FaGlobeAfrica, FaUser, FaCubes, FaCube, FaBuilding, FaLocationArrow, FaHome, FaFile, FaChartArea, FaChartPie, FaIndustry } from "react-icons/fa"
import "./newTopBar.css";

const MenuList = ({ darkTheme }) => {
    return (
        <div>
            <Menu theme={darkTheme ? 'dark' : "light"} mode="inline" className="Menu-Bar">
                <Menu.Item key="Home" icon={<FaHome />}> <Link to="/home">Início</Link></Menu.Item>
                <Menu.SubMenu
                    key="Usuarios"
                    icon={<FaUser />}
                    title="Usuários"
                >
                    <Menu.Item key="usuarios-Adicionar" icon={<PlusOutlined />}><Link to="usuarios" >Adicionar </Link></Menu.Item>
                    <Menu.Item key="usuarios-Gestão" icon={<FaUser />}><Link to="gestaoUsuarios">Gestão</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Turistas"
                    icon={<FaUser />}
                    title="Turistas"
                >
                    <Menu.Item key="turistas-Adicionar" icon={<PlusOutlined />}><Link to="turistas" >Adicionar </Link></Menu.Item>
                    <Menu.Item key="turistas-Gestão" icon={<FaUser />}><Link to="gestaoTuristas">Gestão</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="PontosTuristicos"
                    icon={<FaGlobeAfrica />}
                    title="Pontos Turisticos"
                >
                    <Menu.Item key="pontos-Adicionar" icon={<PlusOutlined />}><Link to="pontosTuristicos">Adicionar</Link></Menu.Item>
                    <Menu.Item key="pontos-Gestão" icon={<FaGlobeAfrica />}><Link to="gestaoPontosTuristicos">Gestão</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Hoteis"
                    icon={<FaBuilding />}
                    title="Hoteis"
                >
                    <Menu.Item key="Hoteis-Adicionar" icon={<PlusOutlined />}><Link to="hoteis">Adicionar</Link></Menu.Item>
                    <Menu.Item key="Hoteis-Gestão" icon={<FaBuilding />}><Link to="gestaoHoteis" >Gestão </Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Localização"
                    icon={<FaLocationArrow />}
                    title="Localização"
                >
                    <Menu.Item key="location-Adicionar" icon={<PlusOutlined />}><Link to="localizacao">Adicionar</Link></Menu.Item>
                    <Menu.Item key="location-Gestão" icon={<FaLocationArrow />}><Link to="gestaoLocalizacao" >Gestão </Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Quartos"
                    icon={<FaCube />}
                    title="Quartos"
                >
                    <Menu.Item key="quartos-Adicionar" icon={<PlusOutlined />}><Link to="quartos">Adicionar</Link></Menu.Item>
                    <Menu.Item key="quartos-Gestão" icon={<FaCube />}><Link to="gestaoQuartos">Gestão</Link></Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu
                    key="Reservas"
                    icon={<FaCube />}
                    title="Reservas"
                >
                    <Menu.Item key="reservas-Adicionar" icon={<PlusOutlined />}><Link to="reservas">Adicionar</Link></Menu.Item>
                    <Menu.Item key="reservas-Gestão" icon={<FaCube />}><Link to="gestaoReservas">Gestão</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
};

export default MenuList;
