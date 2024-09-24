import React, { useState } from 'react';
import './css/Navigation.css';
import { ClipLoader } from 'react-spinners'; // Importa o componente de loader

const Navigation = ({ setCurrentPage, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para controlar a animação de logout

  const handleLogout = () => {
    setIsLoggingOut(true); // Ativa a animação
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove o token do localStorage
      localStorage.removeItem('tokenExpiration');
      onLogout(); // Chama a função para redirecionar para a página de login
      console.log('Usuário saiu');
    }, 3000); // Aguarda 5 segundos antes de efetuar o logout
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
        </div>
      </div>
      <form className="d-flex mr-2">
        <button className="btn btn-danger" type="button" onClick={handleLogout}>
          {isLoggingOut ? <ClipLoader color="#fff" size={20} /> : "Desconectar"}
        </button>
      </form>
    </nav>
  );
};

export default Navigation;
