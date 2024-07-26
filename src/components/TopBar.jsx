import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { objectUsers } from "../Pages/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./sidebar.css"
import image from "./img/12.jpg"
import Logo from "./img/Logo.png"

const TopBar = (props) => {

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  return (
    <div className=''>
      <header className="header  lg:relative lg:px-5 flex items-center justify-between lg:float-right ">
        <div className='flex items-center justify-between gap-2'>
        <div className="d-flex self-start ">
            <button className="toggle-btn block lg:" type="button" onClick={toggleSidebar}>
              <i class="lni lni-menu"></i>
            </button>
          </div>

          <div>
            <p className="text-[#64748B] hidden lg:block text-sm">{props.menu} / <span className=" font-bold text-[#222222]">{props.submenu}</span></p>
            <p className=" font-semibold hidden lg:block text-[#222222] mt-[2px]">{props.submenu}</p>
          </div>
          
        </div>

        <div className="user flex items-center">

          <div className=" block text-end mr-6">
            <p className=" hidden lg:block text-black">{objectUsers.user1.nome} {objectUsers.user1.sobrenome}</p>
            <p className="text-[#64748B] hidden lg:block">{objectUsers.user1.tipo}</p>
          </div>
          <div className="ProfilePhoto w-[60px] justify-center items-center flex rounded-full h-[60px] lg:mr-4">
            <img src={image} className=" w-[50px] rounded-full h-[50px]" alt="" srcset="" />
          </div>

          {/* Dropdown para exibir detalhes do usuário */}
          <Dropdown>
            <Dropdown.Toggle variant="" >
              <i className="fa-solid fa-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className=' mt-[10px]'>
              <Dropdown.ItemText className="text-black text-center">Olá, {objectUsers.user1.nome}</Dropdown.ItemText>
              <Dropdown.ItemText className="text-[#64748B] text-center">{objectUsers.user1.tipo}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item >Fazer logout</Dropdown.Item>
              <Dropdown.Item href="#">Alterar senha</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      {/* sidebar */}

      <div className={`wrapper ${expanded ? 'expand' : ''}   float-left top-0 bottom-0 z-[999999999]`}>
        <aside id="sidebar" className={`${expanded ? 'expand' : ''}  float-left`}>
            {/* <div className="d-flex self-start">
              <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                <i class="lni lni-menu" ></i>
              </button>
            </div> */}
          <img className=' m-auto border-b-2' src={Logo} alt="" srcset="" />
          <ul className="sidebar-nav w-full h-full">
            <li className='ident font-bold self-center'>Menu</li>
            {/* Dashboard */}
            <li className="sidebar-item">
              <Link to="/"
                href="#"
                className="sidebar-link "
              >
                <i class="lni lni-home"></i>
                <span>Inicio</span>
              </Link>
              {/* Submenus */}
            </li>

            {/* Dashboard */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard"
                aria-expanded="false"
                aria-controls="dashboard"
              >
                <i className="lni lni-dashboard"></i>
                <span>Dashboard</span>
              </a>
              {/* Submenus */}
              <ul id="dashboard" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Relatórios Gerais */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#relatorios"
                aria-expanded="false"
                aria-controls="relatorios"
              >
                <i class="lni lni-files"></i>
                <span>Relatórios Gerais</span>
              </a>
              {/* Submenus */}
              <ul id="relatorios" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Operadores */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#operadores"
                aria-expanded="false"
                aria-controls="operadores"
              >
                <i className="lni lni-users"></i>
                <span>Operadores</span>
              </a>
              {/* Submenus */}
              <ul id="operadores" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/formulario-operador" className="sidebar-link"><i class="fa-solid fa-plus text-green-400 "></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/gestaoOperador" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500 text-blue-500"></i> Gestão</Link>
                </li>
              </ul>
            </li>
            {/* Bacias */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#bacias"
                aria-expanded="false"
                aria-controls="bacias"
              >
                <i className="lni lni-map"></i>
                <span>Bacias</span>
              </a>
              {/* Submenus */}
              <ul id="bacias" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/cadastrarBacicas" href="#" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/pesquisaBacias" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
              </ul>
            </li>
            {/* Blocos */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#blocos"
                aria-expanded="false"
                aria-controls="blocos"
              >
                <i class="lni lni-package"></i>
                <span>Blocos</span>
              </a>
              {/* Submenus */}
              <ul id="blocos" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/adicionarBlocos" href="#" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/filtroBlocos" href="#" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Campos */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#campos"
                aria-expanded="false"
                aria-controls="campos"
              >
                <i className="lni lni-map-marker"></i>
                <span>Campos</span>
              </a>
              {/* Submenus */}
              <ul id="campos" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/cadastrarCampo" href="#" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/FiltroCampo" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
              </ul>
            </li>
            {/* Poços */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#pocos"
                aria-expanded="false"
                aria-controls="pocos"
              >
                <i className="lni lni-drop"></i>
                <span>Poços</span>
              </a>
              {/* Submenus */}
              <ul id="pocos" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/cadastrarPocos" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/gestaoPocos" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Projectos */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#projectos"
                aria-expanded="false"
                aria-controls="projectos"
              >
                <i className="lni lni-files"></i>
                <span>Projectos</span>
              </a>
              {/* Submenus */}
              <ul id="projectos" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/adicionarProjectos" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/gestaoDeProjectos" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Avaliação Petrofisica */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#avaliacao"
                aria-expanded="false"
                aria-controls="avaliacao"
              >
                <i class="lni lni-bar-chart"></i>
                <span>Avaliação Petrofisica</span>
              </a>
              {/* Submenus */}
              <ul id="avaliacao" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Caracterização */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#caracterizacao"
                aria-expanded="false"
                aria-controls="caracterizacao"
              >
                <i class="lni lni-cog"></i>
                <span>Caracterização</span>
              </a>
              {/* Submenus */}
              <ul id="caracterizacao" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            {/* Plataformas */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#plataformas"
                aria-expanded="false"
                aria-controls="plataformas"
              >
                <i className="fas fa-cube"></i>
                <span>Plataformas</span>
              </a>
              {/* Submenus */}
              <ul id="plataformas" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="/AdicionarPlataforma" className="sidebar-link"><i class="fa-solid fa-plus text-green-400"></i> Adicionar</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/GestaoPlataforma" className="sidebar-link"><i class="fa-solid fa-folder-plus text-blue-500"></i> Gestão</Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li>
              </ul>
            </li>
            <li className='ident font-bold'>ADM</li>
            {/* Colaboradores */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#colaboradores"
                aria-expanded="false"
                aria-controls="colaboradores"
              >
                <i className="lni lni-users"></i>
                <span>Colaboradores</span>
              </a>
              {/* Submenus */}
              <ul id="colaboradores" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                {/* <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li> */}
              </ul>
            </li>
            {/* Gestão */}
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#gestao"
                aria-expanded="false"
                aria-controls="gestao"
              >
                <i className="lni lni-briefcase"></i>
                <span>Gestão</span>
              </a>
              {/* Submenus */}
              <ul id="gestao" className="sidebar-dropdown list-unstyled collapse visible" data-bs-parent="#sidebar">
                {/* <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 2</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Submenu 3</a>
                </li> */}
              </ul>
            </li>
          </ul>

        </aside>
      </div>


    </div>


  );
}

export default TopBar;
