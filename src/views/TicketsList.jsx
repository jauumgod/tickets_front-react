import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/TicketsList.css'; // Importação do arquivo CSS

const TicketsViewAPI = () => {
  const [tickets, setTickets] = useState([]);  
  const [showModal, setShowModal] = useState(false);  
  const [operacao, setOperacao] = useState('');  
  const [sequencia, setSequencia] = useState('');  
  const [criacao, setCriacao] = useState('');  
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalTickets, setTotalTickets] = useState(0); // Total de tickets

  const fetchTickets = () => {
    let url = `http://127.0.0.1:8000/api/tickets/?page=${currentPage}&limit=5`; // Adicionando parâmetros de paginação
    const params = [];
    
    if (operacao) params.push(`operacao=${operacao}`);
    if (sequencia) params.push(`sequencia=${sequencia}`);
    if (criacao) params.push(`criacao=${criacao}`);
    
    if (params.length > 0) {
      url += '&' + params.join('&');
    }

    const token = localStorage.getItem('token');
    console.log('token: ' + token);

    if (!token) {
      console.error('Usuário não está autenticado');
      return;
    }

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setTickets(response.data.results); // Assumindo que a resposta contém uma lista de tickets
        setTotalTickets(response.data.count); // Supondo que a API retorna o total de tickets
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error));
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, operacao, sequencia, criacao]); // Refaz a busca sempre que a página atual ou filtros mudarem

  const totalPages = Math.ceil(totalTickets / 5); // Calcular o total de páginas

  return (
    <div>
      <div className="main-content">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"></link>

        <div className="container mt-7">
          {/* Botão para abrir o modal de filtros */}
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

          {/* Tabela de tickets */}
          <div className="row">     
            <div className="col">
              <div className="card shadow">
                <div className="card-header border-0">
                  <h3 className="mb-0">Organics - Tickets</h3>
                  <div className='mb-2'>
                    <button className="btn btn-primary button-right"
                    onClick={() => setShowModal(true)}>Filtro</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
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
                          <td>{ticket.id}</td>
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
                        <a className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          <i className="fas fa-angle-left"></i>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <a className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                          <i className="fas fa-angle-right"></i>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estilo do Modal */}
        <style>{`
          .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 400px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .close {
            cursor: pointer;
            float: right;
            font-size: 20px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TicketsViewAPI;
