import React, { useEffect, useState } from "react";
import apiService from "../services/apiService"; // Importando a apiService
import './css/TicketsList.css'; // Importação do arquivo CSS

const PainelGerencial = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [showModal, setShowModal] = useState(false); // Estado para mostrar o modal de filtros
  const [filter, setFilter] = useState(''); // Estado para armazenar o filtro

  // Função para buscar usuários
  const fetchUsuarios = () => {
    apiService.getUsers()
      .then(response => {
        setUsuarios(response.data);
        setLoading(false); // Atualiza o loading após a busca
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
        setLoading(false); // Para o loading mesmo em caso de erro
      });
  };

  // useEffect para buscar usuários ao montar o componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Função para aplicar filtro (exemplo)
  const applyFilter = () => {
    // Aqui você pode implementar a lógica para filtrar os usuários
    // baseando-se no valor do `filter`
    // Isso pode ser feito, por exemplo, filtrando o array `usuarios` antes de renderizá-lo
    console.log("Aplicar filtro:", filter);
    setShowModal(false); // Fechar o modal após aplicar filtro
  };

  if (loading) return <div>Carregando...</div>; // Mensagem de loading

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
                  <label htmlFor="filter">Filtrar por Nome:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                  />
                </div>
                <button className="btn btn-success" onClick={applyFilter}>
                  Aplicar Filtros
                </button>
              </div>
            </div>
          )}

          {/* Tabela de usuários */}
          <div className="row">
            <div className="col">
              <div className="card shadow">
                <div className="card-header border-0">
                  <h3 className="mb-0">Painel Gerencial - Usuários</h3>
                  <div className='mb-2'>
                    <button className="btn btn-primary button-right" onClick={() => setShowModal(true)}>
                      Filtro
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((usuario, index) => (
                        <tr key={index}>
                          <td>{usuario.id}</td>
                          <td>{usuario.user}</td>
                          <td>{usuario.empresas}</td>
                          <td><button className="btn btn-primary">Editar</button></td> {/* Altere de acordo com o que sua API retorna */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer py-4">
                  <nav aria-label="...">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">
                          <i className="fas fa-angle-left"></i>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">
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

export default PainelGerencial;
