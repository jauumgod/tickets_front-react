import React, { useEffect, useState } from "react";
import apiService from '../services/apiService'
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const Graph = ({ setCurrentPage, setSelectedOperation }) => {
  const [data, setData] = useState([]);

  const fetchTickets = () => {
    apiService.getTickets() 
      .then(response => {
        const tickets = response.data;
        const aggregatedData = aggregateData(tickets);
        setData(aggregatedData);
      })
      .catch(error => {
        console.error('Erro ao buscar dados: ', error);
      });
  };

  const aggregateData = (tickets) => {
    const result = {};
    
    tickets.forEach(ticket => {
      const operacaoNome = ticket.operacao.nome;
      const pesoLiquido = ticket.peso_liquido;

      if (!result[operacaoNome]) {
        result[operacaoNome] = 0;
      }
      result[operacaoNome] += pesoLiquido;
    });

    return {
      labels: Object.keys(result), // Nomes das operações
      datasets: [{
        label: 'Peso Líquido',
        data: Object.values(result), // Totais por operação
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Relatório de Saídas</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Bar
            data={data}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Total de Peso Líquido por Operação'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
