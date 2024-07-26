import React from 'react';
import "./spin.css"; // Estilos CSS para o Spinner
import Logo from "../components/img/LogoSlim.png"

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <img src={Logo} width="100%" alt="" srcset="" />
      </div>
    </div>
  );
}

export default Spinner;
