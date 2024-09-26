// src/components/UserModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importar componentes do Bootstrap

const UserModal = ({ isOpen, onClose, onUserCreated }) => {
  const handleSave = () => {
    // Aqui você implementa a lógica de criação do usuário
    const newUser = { id: Math.random(), username: 'Novo Usuario', empresas: { nome: 'Empresa X' } };
    onUserCreated(newUser); // Passa o novo usuário para o callback
    onClose(); // Fecha o modal após salvar
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulário de usuário aqui */}
        <form>
          <div className="form-group">
            <label>Nome do Usuário</label>
            <input type="text" className="form-control" placeholder="Insira o nome do usuário" />
          </div>
          <div className="form-group">
            <label>Empresa</label>
            <input type="text" className="form-control" placeholder="Insira o nome da empresa" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar Usuário
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
