import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importa Modal e Button do Bootstrap
import apiService from '../services/apiService';

const ImpressaoTickets = ({ setCurrentPage, setSelectedTicketId }) => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [operacao, setOperacao] = useState('');
  const [sequencia, setSequencia] = useState('');
  const [criacao, setCriacao] = useState('');
  const [currentPage, setCurrentPageIndex] = useState(1); // Estado para a página atual
  const [totalPages, setTotalPages] = useState(1); // Estado para o número total de páginas
  const [limit] = useState(10); // Número de itens por página

  // Função para buscar tickets com paginação
  const fetchTickets = (page = 1) => {
    apiService.getTickets(operacao, sequencia, criacao, page, limit)
      .then(response => {
        setTickets(response.data.results || response.data);
        setTotalPages(Math.ceil(response.data.count / limit));
      })
      .catch(error => {
        console.error('Erro ao buscar os tickets:', error.message);
      });
  };

  // Carregar tickets ao montar o componente e ao alterar filtros ou página
  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage, operacao, sequencia, criacao]);

  // Função para ir para a próxima página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPageIndex(prevPage => prevPage + 1);
    }
  };

  // Função para ir para a página anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPageIndex(prevPage => prevPage - 1);
    }
  };

  // Função para definir a página atual ao clicar em um número de página
  const goToPage = (page) => {
    setCurrentPageIndex(page);
  };

  return (
    <div className="main-content">
      <div className="container mt-7">
        {/* Modal de Filtros com Bootstrap */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Filtros de Tickets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={() => { fetchTickets(1); setShowModal(false); }}>
              Aplicar Filtros
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Tabela e Botão de Filtro */}
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0">Organics - Tickets</h3>
                <div className='mb-2'>
                  <Button variant="primary" onClick={() => setShowModal(true)}>Filtro</Button>
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
                    {tickets.length > 0 ? (
                      tickets.map((ticket, index) => (
                        <tr key={index}>
                          <td>{ticket.sequencia}</td>
                          <td>{ticket.empresa.nome}</td>
                          <td>{ticket.peso_liquido}</td>
                          <td>{ticket.criacao}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => {
                                setSelectedTicketId(ticket.id);
                                setCurrentPage('ticketPrint');
                              }}
                            >
                              Imprimir
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Nenhum ticket encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Navegação de Paginação */}
              <div className="card-footer py-4">
                  <nav aria-label="...">
                    <ul className="pagination justify-content-end mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          <i className="fas fa-angle-left"></i> Anterior
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                          <i className="fas fa-angle-right"></i> Próx
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressaoTickets;
