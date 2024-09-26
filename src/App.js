import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TicketsViewAPI from './views/TicketsViewAPI';
import TicketsForm from './views/TicketsForm';
import TicketPrint from './views/TicketPrint';
import ImpressaoTickets from './views/ImpressaoTickets';
import Graph from './components/Graph';
import OperationDetails from './components/OperationDetails';
import LoginForm from './views/LoginForm';
import "../src/App.css";
import PainelGerencial from './views/PainelGerencial';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({}); // Considera o usuário logado se houver um token
      setCurrentPage('ticketsView'); // Vai direto para a página inicial
    }
  }, []);

  const onLoginSuccess = () => {
    setCurrentPage('ticketsView'); // Redireciona para a página inicial
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'ticketsView':
        return <TicketsViewAPI setCurrentPage={setCurrentPage} setSelectedTicketId={setSelectedTicketId} />;
      case 'ticketsForm':
        return <TicketsForm />;
      case 'impressaoTickets':
        return <ImpressaoTickets setCurrentPage={setCurrentPage} setSelectedTicketId={setSelectedTicketId} />;
      case 'graphPesoLiquido':
        return <Graph setCurrentPage={setCurrentPage} setSelectedOperation={setSelectedOperation} />;
      case 'operationDetails':
        return <OperationDetails operation={selectedOperation} />;
      case 'ticketPrint':
        return <TicketPrint ticketId={selectedTicketId} />;
      case 'painelGerencial':
        return<PainelGerencial/>
      default:
        return <LoginForm setUser={setUser} onLoginSuccess={onLoginSuccess} />;
    }
  };

  return (
    <div>
      {user && currentPage !== 'login' && <Navigation setCurrentPage={setCurrentPage} />} {/* Navigation renderizado fora do switch */}
      <div className="container">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
