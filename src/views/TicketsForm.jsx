import React, { useState } from 'react';
import axios from 'axios';
import './css/TicketsForm.css';

const TicketForm = ({ user }) => {
  const [placa, setPlaca] = useState('');
  const [produto, setProduto] = useState('');
  const [transportadora, setTransportadora] = useState('');
  const [motorista, setMotorista] = useState('');
  const [operador, setOperador] = useState('');
  const [cliente, setCliente] = useState('');
  const [pesoEntrada, setPesoEntrada] = useState(0);
  const [pesoSaida, setPesoSaida] = useState(0);
  const [pesoLiquido, setPesoLiquido] = useState(0);
  const [loteLeira, setLoteLeira] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userId')
    const empresaID = localStorage.getItem('userEmpresaId');


    if (!token) {
      console.error('Usuário não está autenticado');
      return;
    }

    if (!user || !user.id) {
      console.error('Usuário não está definido corretamente');
      return;
    }
    if (!empresaID) {
      console.error('ID da empresa não encontrado');
      return;
    }

    const ticketData = {
      placa,
      produto,
      transportadora,
      motorista,
      operador,
      cliente,
      peso_entrada: pesoEntrada,
      peso_saida: pesoSaida,
      peso_liquido: pesoLiquido,
      lote_leira: loteLeira,
      ticket_cancelado: false,
      usuario: userID,
      operacao: empresaID
    };

    axios.post('http://127.0.0.1:8000/api/tickets/', ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Ticket criado com sucesso:', response.data);
      // Adicione um redirecionamento ou notificação de sucesso aqui
    })
    .catch(error => {
      console.error('Erro ao criar o ticket:', error);
    });
  };

  const handlePesoEntradaChange = (value) => {
    setPesoEntrada(value);
    setPesoLiquido(value - pesoSaida);
  };

  const handlePesoSaidaChange = (value) => {
    setPesoSaida(value);
    setPesoLiquido(pesoEntrada - value);
  };

  return (
    <div>
      <h2 align="center">Gerar Ticket</h2><br />
      <div className='form-container'>
        <form className='form-control' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Placa"
              maxLength={8}
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Transportadora"
              value={transportadora}
              onChange={(e) => setTransportadora(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Motorista"
              value={motorista}
              onChange={(e) => setMotorista(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Operador"
              value={operador}
              onChange={(e) => setOperador(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            Peso de Entrada
            <input
              className='form-control'
              type="number"
              placeholder="Peso de Entrada"
              value={pesoEntrada}
              onChange={(e) => handlePesoEntradaChange(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className='mb-2'>
            Peso de Saída
            <input
              className='form-control'
              type="number"
              placeholder="Peso de Saída"
              value={pesoSaida}
              onChange={(e) => handlePesoSaidaChange(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className='mb-2'>
            Peso Líquido
            <input
              className='form-control'
              type="number"
              placeholder="Peso Líquido"
              value={pesoLiquido}
              readOnly
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Lote Leira"
              value={loteLeira}
              onChange={(e) => setLoteLeira(e.target.value)}
            />
          </div>
          <button className='btn btn-primary' type="submit">Salvar Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
