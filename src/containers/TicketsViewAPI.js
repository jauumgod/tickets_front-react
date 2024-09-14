import React from "react";
import NavBarComponent from './NavBarComponent';
import Paginacao from './Paginacao';

class TicketsViewAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [] // Inicializa com um array vazio
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/tickets/')
      .then(resposta => resposta.json())
      .then(dados => {
        this.setState({
          tickets: dados // Atualiza o estado com os dados obtidos
        });
      })
      .catch(error => console.error('Erro ao buscar os dados:', error)); // Exibe erro, se houver
  }

  render() {
    const { tickets } = this.state; // Desestruturação para obter os tickets do estado

    return (
    <div className="mb-3 mt-6">
      <NavBarComponent/>
      <h2>Tickets</h2><br/>
      <table className="table table bg-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Sequência</th>
            <th>Leira</th>
            <th>Operação</th>
            <th>Criação</th>

          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ticket.sequencia}</td>
                <td>{ticket.lote_leira}</td>
                <td>{ticket.operacao}</td>
                <td>{ticket.criacao}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum ticket encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Paginacao/>
    </div>
    );
  }
}

export default TicketsViewAPI;
