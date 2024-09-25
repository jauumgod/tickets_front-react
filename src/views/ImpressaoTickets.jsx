// src/views/ImpressaoTickets.js

import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import './css/TicketsList.css';

const ImpressaoTickets = ({ setCurrentPage, setSelectedTicketId }) => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [operacao, setOperacao] = useState('');
  const [sequencia, setSequencia] = useState('');
  const [criacao, setCriacao] = useState('');

  const fetchTickets = () => {
    apiService.getTickets(operacao, sequencia, criacao)
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os tickets:', error.message);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="main-content">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"></link>
      <div className="container mt-7">
        {/* Modal de Filtros e Tabela */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h3>Filtros</h3>
              <div className="form-group">
                <label htmlFor="operacao">Operação:</label>
                <input
                  type="text"
                  className="form-control"
                  value={operacao}
                  onChange={e => setOperacao(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sequencia">Sequência:</label>
                <input
                  type="text"
                  className="form-control"
                  value={sequencia}
                  onChange={e => setSequencia(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="criacao">Data de Criação:</label>
                <input
                  type="date"
                  className="form-control"
                  value={criacao}
                  onChange={e => setCriacao(e.target.value)}
                />
              </div>
              <button className="btn btn-success" onClick={() => { fetchTickets(); setShowModal(false); }}>
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0">Organics - Tickets</h3>
                <div className='mb-2'>
                  <button className="btn btn-primary button-right" onClick={() => setShowModal(true)}>Filtro</button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sequência</th>
                      <th scope="col">Operação</th>
                      <th scope="col">Peso</th>
                      <th scope="col">Data de criação</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr key={index}>
                        <td>{ticket.sequencia}</td>
                        <td>{ticket.empresa.nome}</td>
                        <td>{ticket.peso_liquido}</td>
                        <td>{ticket.criacao}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => {
                            setSelectedTicketId(ticket.id); // Armazena o ID do ticket
                            setCurrentPage('ticketPrint'); // Altera para a página de impressão
                          }}>
                            Imprimir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Resto do código para a paginação */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressaoTickets;
