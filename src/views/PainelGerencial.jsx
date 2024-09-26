// src/pages/PainelGerencial.jsx

import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import UserModal from "../components/UserModal"; // Importa o UserModal
import { Button, Table, Card, Row, Col } from 'react-bootstrap'; // Importa componentes Bootstrap

const PainelGerencial = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const fetchUsuarios = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiService.getUsers(page, limit);
      setUsuarios(response.data.results || response.data);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios(currentPage);
  }, [currentPage]);

  const handleUserCreated = (newUser) => {
    setUsuarios((prev) => [...prev, newUser]); // Adiciona o novo usuário à lista
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mt-4">
      {/* Modal para criação de usuário */}
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUserCreated={handleUserCreated}
      />

      <Row className="mb-4">
        <Col>
          <h3>Painel Gerencial - Usuários</h3>
        </Col>
        <Col className="text-right">
          {/* Botão para abrir o modal */}
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Criar Usuário
          </Button>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Header>
          <h4 className="mb-0">Lista de Usuários</h4>
        </Card.Header>
        <div className="table-responsive">
          <Table hover bordered>
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.empresas?.nome || 'Não informado'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum usuário encontrado.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default PainelGerencial;
