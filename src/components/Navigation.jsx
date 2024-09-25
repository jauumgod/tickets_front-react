import React, { useState } from 'react';
import './css/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de configurações

const Navigation = ({ setCurrentPage }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para controlar a animação de logout

  const handleLogout = () => {
    setIsLoggingOut(true); // Ativa a animação
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove o token do localStorage
      setCurrentPage('login'); // Redireciona para a página de login
      console.log('Usuário saiu');
    }, 2000); 
  };

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <a className="navbar-brand" href="#">JMNDSystems</a>
      <div className="container-fluid">
        <div className="navbar-nav">
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('ticketsView')}>Tickets</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('ticketsForm')}>Novo Ticket</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('impressaoTickets')}>Impressão</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('graphPesoLiquido')}>Gráfico</a>
          {/* Ícone de configuração */}
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('painelGerencial')}>
            <FontAwesomeIcon icon={faCog} /> Painel Gerencial
          </a>
        </div>
      </div>
      <form className="d-flex mr-2">
        <button className="btn btn-danger" type="button" onClick={handleLogout}>Desconectar</button>
      </form>
      {isLoggingOut && (
        <div className="logout-animation">
          <div className="loader"></div>
          <p>Desconectando...</p>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
