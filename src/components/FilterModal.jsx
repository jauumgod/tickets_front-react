import React, { useState } from 'react';

const FilterModal = ({ showModal, setShowModal, operacao, setOperacao, sequencia, setSequencia, criacao, setCriacao, fetchTickets }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!showModal) return null; // Não renderiza nada se o modal não deve ser exibido

  // Fecha o modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Aplica os filtros com base no campo de busca
  const handleApplyFilters = () => {
    // Separa a busca em operação e sequência
    const [operation, sequence] = searchQuery.split(' ');
    setOperacao(operation || '');
    setSequencia(sequence || '');
    fetchTickets(); // Faz a busca com os valores definidos
    handleClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Filtros de Busca</h4>
        
        {/* Campo de Busca Unificado para Operação e Sequência */}
        <label>
          Buscar por Operação e Sequência:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite Operação Sequência (Ex: Operacao1 1234)"
          />
        </label>
        
        {/* Botão para Filtro de Data */}
        <div>
          <label>
            Data de Criação:
            <input
              type="date"
              value={criacao}
              onChange={(e) => setCriacao(e.target.value)}
            />
          </label>
          <button onClick={fetchTickets}>Buscar por Data</button>
        </div>

        {/* Botões de Aplicar e Fechar */}
        <div className="modal-buttons">
          <button onClick={handleApplyFilters}>Aplicar Filtros</button>
          <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
