import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TicketsViewAPI from './views/TicketsList';
import TicketsForm from './views/TicketsForm';
import TicketPrint from './views/TicketPrint';
import ImpressaoTickets from './views/ImpressaoTickets';
import Graph from './components/Graph';
import OperationDetails from './components/OperationDetails';
import LoginForm from './views/LoginForm';
import "../src/App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [user, setUser] = useState(null); // Para armazenar o usuário logado

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (token && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      const now = new Date();

      if (now < expirationDate) {
        setUser(token); // Ou, se preferir, use o usuário do localStorage
        setCurrentPage('ticketsView'); // Muda para a página inicial se o token for válido
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      }
    }
  }, []);

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
      default:
        return <LoginForm setCurrentPage={setCurrentPage} setUser={setUser} />;
    }
  };

  return (
    <div>
      {currentPage !== 'login' && <Navigation setCurrentPage={setCurrentPage} />}
      <div className="container">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
