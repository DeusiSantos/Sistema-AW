import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider/useAuth';
import './PublicMenu.css'; // Importa o arquivo CSS

const { Header } = Layout;

const PublicMenu = () => {
  const auth = useAuth();
  const isLoggedIn = auth.username !== undefined;

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" className="header-menu">
        <div className="left-menu">
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/hoteis">Hotéis</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/pontosTuristicos">Pontos Turísticos</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/quartos">Quartos</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/reservas">Reservas</Link>
          </Menu.Item>
        </div>
        <div className="right-menu">
          {isLoggedIn ? (
            <Menu.Item key="6">
              <span>Olá, {auth.nome}</span>
              <Button type="primary" onClick={auth.logout} style={{ marginLeft: '10px' }}>
                Logout
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item key="6">
              <Link to="/login">
                <Button type="primary">Login</Button>
              </Link>
            </Menu.Item>
          )}
        </div>
      </Menu>
    </Header>
  );
};

export default PublicMenu;
