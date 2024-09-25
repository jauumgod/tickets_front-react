import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import './css/TicketsList.css';
import './css/PainelGerencial.css';

const PainelGerencial = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar empresas
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', empresa: '' }); // Adicionando o campo de senha

  // Função para buscar usuários
  const fetchUsuarios = () => {
    apiService.getUsers()
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
        setLoading(false);
      });
  };

  // Função para buscar empresas
  const fetchEmpresas = () => {
    apiService.getEmpresas()
      .then(response => {
        setEmpresas(response.data); // Armazena a lista de empresas
      })
      .catch(error => {
        console.error("Erro ao buscar empresas:", error);
      });
  };

  // useEffect para buscar usuários e empresas ao montar o componente
  useEffect(() => {
    fetchUsuarios();
    fetchEmpresas();
  }, []);

  // Função para criar um novo usuário
  const createUser = () => {
    apiService.createUser(newUser)
      .then(response => {
        setUsuarios([...usuarios, response.data]);
        setShowModal(false);
        setNewUser({ username: '', password: '', empresa: '' }); // Resetando os campos
      })
      .catch(error => {
        console.error("Erro ao criar usuário:", error);
      });
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="main-content">
        {/* Modal de Criação de Usuário */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h3>Criar Usuário</h3>
              <div className="form-group">
                <label htmlFor="username">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="empresa">Empresa:</label>
                <select
                  className="form-control"
                  value={newUser.empresa}
                  onChange={e => setNewUser({ ...newUser, empresa: e.target.value })}
                >
                  <option value="">Selecione uma empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nome} {/* Supondo que o campo que contém o nome da empresa seja 'nome' */}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-success" onClick={createUser}>
                Criar Usuário
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
                    Criar Usuário
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
                        <td>{usuario.username}</td>
                        <td>{usuario.empresas.nome}</td>
                        <td><button className="btn btn-primary">Editar</button></td>
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
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
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
    </div>
  );
};

export default PainelGerencial;
