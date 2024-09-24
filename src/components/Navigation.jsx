import React, { useState, useEffect } from 'react';
import './css/Navigation.css';

const Navigation = ({ setCurrentPage }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para controlar a animação de logout
  const [username, setUsername] = useState(''); // Estado para armazenar o nome do usuário


  const handleLogout = () => {
    setIsLoggingOut(true); // Ativa a animação
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove o token do localStorage
      localStorage.removeItem('username'); // Remover o username ao deslogar
      setCurrentPage('login'); // Redireciona para a página de login
      console.log('Usuário saiu');
    }, 3000); // Aguarda 5 segundos antes de efetuar o logout
  };

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <a className="navbar-brand" href="#">JMNDSystems</a> {/* Exibe o nome do usuário */}
      <div className="container-fluid">
        <div className="navbar-nav">
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('ticketsView')}>Tickets</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('ticketsForm')}>Novo Ticket</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('impressaoTickets')}>Impressão</a>
          <a className="nav-item nav-link text-white" href='#' onClick={() => setCurrentPage('graphPesoLiquido')}>Gráfico</a>
        </div>
      </div>
      <form className="d-flex mr-2">
        <button className="btn btn-danger" type="button" onClick={handleLogout}>Desconectar</button>
      </form>
      {isLoggingOut && (
        <div className="logout-animation">
          <div className="loader"></div> {/* Elemento para a animação */}
          <p>Desconectando...</p>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
