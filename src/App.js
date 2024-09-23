import React, { useState } from 'react';
import Navigation from './components/Navigation';
import TicketsViewAPI from './views/TicketsList'; // Importa suas páginas
import TicketsForm from './views/TicketsForm';
import ImpressaoTickets from './views/ImpressaoTickets';
import Graph from './components/Graph';
import OperationDetails from './components/OperationDetails';

const App = () => {
  const [currentPage, setCurrentPage] = useState('ticketsView');
  const [selectedOperation, setSelectedOperation] = useState(null); // Para armazenar os dados da operação

  const renderPage = () => {
    switch (currentPage) {
      case 'ticketsView':
        return <TicketsViewAPI />;
      case 'ticketsForm':
        return <TicketsForm />;
      case 'impressaoTickets':
        return <ImpressaoTickets />;
      case 'graphPesoLiquido':
        return <Graph setCurrentPage={setCurrentPage} setSelectedOperation={setSelectedOperation} />; // Passa setSelectedOperation
      case 'operationDetails':
        return <OperationDetails operation={selectedOperation} />; // Exibe os detalhes da operação
      default:
        return <TicketsViewAPI />; // Página padrão
    }
  };

  return (
    <div>
      <Navigation setCurrentPage={setCurrentPage} />
      <div className="container">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
