import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthProvider';
import ProtectedLayout from './components/ProtectedLayout';
import TopBar from './components/NewTopBar';
import PageNotFound from './Pages/404Page';
import Spinner from './components/Spin';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Usuarios from './Pages/PadinasSubMenus/Usuarios';
import GestaoUsuarios from './Pages/PadinasSubMenus/GestaoUsuarios';
import Turistas from './Pages/PadinasSubMenus/Turistas';
import GestaoTuristas from './Pages/PadinasSubMenus/GestaoTuristas';
import PontosTuristicos from './Pages/PadinasSubMenus/PontosTuristicos';
import GestaoPontosTuristicos from './Pages/PadinasSubMenus/GestaoPontosTuristicos';
import Hoteis from './Pages/PadinasSubMenus/Hoteis';
import GestaoHoteis from './Pages/PadinasSubMenus/GestaoHoteis';
import Localizacao from './Pages/PadinasSubMenus/Localizacao';
import GestaoLocalizacao from './Pages/PadinasSubMenus/GestaoLocalizacao';
import Quartos from './Pages/PadinasSubMenus/Quartos';
import GestaoQuartos from './Pages/PadinasSubMenus/GestaoQuartos';
import Reservas from './Pages/PadinasSubMenus/Reservas';
import GestaoReservas from './Pages/PadinasSubMenus/GestaoReservas';
import Configuracoes from './Pages/PadinasSubMenus/Configuracoes';
import EditarUsuario from './Pages/PadinasSubMenus/Crud/EditarUsuario';
import EditarTurista from './Pages/PadinasSubMenus/Crud/EditarTurista';
import EditarPontosTuristicos from './Pages/PadinasSubMenus/Crud/EditarPontoTuristico';
import EditarHotel from './Pages/PadinasSubMenus/Crud/EditarHotel';
import EditarLocalizacao from './Pages/PadinasSubMenus/Crud/EditarLocalizacao';
import EditarQuarto from './Pages/PadinasSubMenus/Crud/EditarQuartos';
import EditarReserva from './Pages/PadinasSubMenus/Crud/EditarReservas';
import Index from './Pages/public';
import HoteisIndex from './Pages/public/hoteis';
import Pontos from './Pages/public/pontos';
import PublicMenu from './components/PublicMenu';
import QuartosIndex from './Pages/public/quartos';
import ReservaIndex from './Pages/public/reservas';

const App = () => {

  return (
    <AuthProvider>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hoteis" element={<HoteisIndex />} />
        <Route path="/pontosTuristicos" element={<Pontos />} />
        <Route path="/quartos" element={<QuartosIndex />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/reservas" element={<ReservaIndex />} />
          <Route path="/home" element={<TopBar />}>
            <Route index element={<Home />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="gestaoUsuarios" element={<GestaoUsuarios />} />

            <Route path="turistas" element={<Turistas />} />
            <Route path="gestaoTuristas" element={<GestaoTuristas />} />

            <Route path="pontosTuristicos" element={<PontosTuristicos />} />
            <Route path="gestaoPontosTuristicos" element={<GestaoPontosTuristicos />} />

            <Route path="hoteis" element={<Hoteis />} />
            <Route path="gestaoHoteis" element={<GestaoHoteis />} />

            <Route path="localizacao" element={<Localizacao />} />
            <Route path="gestaoLocalizacao" element={<GestaoLocalizacao />} />

            <Route path="quartos" element={<Quartos />} />
            <Route path="gestaoQuartos" element={<GestaoQuartos />} />

            <Route path="reservas" element={<Reservas />} />
            <Route path="gestaoReservas" element={<GestaoReservas />} />

            <Route path="configuracoes" element={<Configuracoes />} />

            {/* Rotas para edição e exclusão */}
            <Route path="/home/editar/:id" element={<EditarUsuario />} />
            <Route path="/home/editarTurista/:id" element={<EditarTurista />} />
            <Route path="/home/editarPontoTuristico/:id" element={<EditarPontosTuristicos />} />
            <Route path="/home/editarHotel/:id" element={<EditarHotel />} />
            <Route path="/home/editarLocalizacao/:id" element={<EditarLocalizacao />} />
            <Route path="/home/editarQuartos/:id" element={<EditarQuarto />} />
            <Route path="/home/editarReserva/:id" element={<EditarReserva />} />
          </Route>
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
