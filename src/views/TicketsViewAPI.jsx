import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService'; // Importa o apiService
import FilterModal from '../components/FilterModal'; // Importe o componente de modal

const TicketsViewAPI = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [operacao, setOperacao] = useState('');
  const [sequencia, setSequencia] = useState('');
  const [criacao, setCriacao] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);

  const fetchTickets = () => {
    apiService.getTickets(operacao, sequencia, criacao, currentPage, 5)
      .then(response => {
        setTickets(response.data.results);
        setTotalTickets(response.data.count);
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error));
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, operacao, sequencia, criacao]);

  const totalPages = Math.ceil(totalTickets / 5);

  const handleModalClick = (e) => {
    e.stopPropagation(); // Impede que o clique feche o modal
  };

  return (
    <div>
      <div className="main-content">
        <div className="container mt-7">
          <FilterModal 
            showModal={showModal} 
            setShowModal={setShowModal} 
            operacao={operacao}
            setOperacao={setOperacao}
            sequencia={sequencia}
            setSequencia={setSequencia}
            criacao={criacao}
            setCriacao={setCriacao}
            fetchTickets={fetchTickets} 
          />

          <div className="row">
            <div className="col">
              <div className="card shadow">
                <div className="card-header border-0">
                  <h3 className="mb-0">Organics - Tickets</h3>
                  <div className='mb-2'>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Filtro</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Sequência</th>
                        <th scope="col">Operação</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Peso Líquido</th>
                        <th scope="col">Data de Criação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>{ticket.sequencia}</td>
                          <td>{ticket.empresa.nome}</td>
                          <td>{ticket.placa}</td>
                          <td>{ticket.peso_liquido}</td>
                          <td>{ticket.criacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

      {/* Modal Bootstrap */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} onClick={() => setShowModal(false)}>
        <div className="modal-dialog" onClick={handleModalClick}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filtro</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Aqui você pode colocar os inputs para filtros */}
              {/* Exemplo: */}
              <div className="mb-3">
                <label htmlFor="operacao" className="form-label">Operação</label>
                <input type="text" className="form-control" id="operacao" value={operacao} onChange={(e) => setOperacao(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="sequencia" className="form-label">Sequência</label>
                <input type="text" className="form-control" id="sequencia" value={sequencia} onChange={(e) => setSequencia(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="criacao" className="form-label">Data de Criação</label>
                <input type="date" className="form-control" id="criacao" value={criacao} onChange={(e) => setCriacao(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
              <button type="button" className="btn btn-primary" onClick={() => { fetchTickets(); setShowModal(false); }}>Aplicar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TicketsViewAPI;
