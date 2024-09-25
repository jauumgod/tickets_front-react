import React, { useState } from 'react';
import './css/popup.css'; // Você pode criar um arquivo CSS para estilizar o pop-up

const PopComponent = ({ title, message, onSubmit, onClose }) => {
  const [inputData, setInputData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputData); // Chama a função onSubmit com os dados do input
    setInputData(''); // Limpa o campo de entrada após o envio
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose}>Fechar</button>
        </form>
      </div>
    </div>
  );
};

export default PopComponent;
