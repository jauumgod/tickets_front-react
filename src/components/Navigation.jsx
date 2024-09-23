import React from 'react';
import './css/Navigation.css';

const Navigation = ({ setCurrentPage }) => {
  const handleLogout = () => {
    // Lógica para logout (ex: limpar token, redirecionar para login)
    console.log('Usuário saiu'); // Placeholder
  };

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <a className="navbar-brand" href="#">Minha Aplicação</a>
      <div className="container-fluid">
        <div className="navbar-nav">
          <a className="nav-item nav-link text-white" onClick={() => setCurrentPage('ticketsView')}>Tickets</a>
          <a className="nav-item nav-link text-white" onClick={() => setCurrentPage('ticketsForm')}>Novo Ticket</a>
          <a className="nav-item nav-link text-white" onClick={() => setCurrentPage('impressaoTickets')}>Impressão</a>
          <a className="nav-item nav-link text-white" onClick={() => setCurrentPage('graphPesoLiquido')}>Gráfico</a>
        </div>
      </div>
      <form className="d-flex mr-2">
        <button className="btn btn-success" type="button" onClick={handleLogout}>Desconectar</button>
      </form>
    </nav>
  );
};

export default Navigation;
