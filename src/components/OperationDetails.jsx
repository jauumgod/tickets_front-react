// OperationDetails.js
import React from 'react';

const OperationDetails = ({ operation }) => {
  if (!operation) return <div>Carregando...</div>; // Trate o caso em que não há operação selecionada

  return (
    <div>
      <h2>Detalhes da Operação</h2>
      <p>Nome: {operation.nome}</p>
      <p>Data: {operation.data}</p>
      <p>Peso: {operation.peso}</p>
      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default OperationDetails;
