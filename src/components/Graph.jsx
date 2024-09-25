import React, { useEffect, useState } from "react";
import apiService from '../services/apiService'; // Importando a apiService
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ setCurrentPage, setSelectedOperation }) => {
  const [data, setData] = useState([]);

  const fetchTickets = () => {
    apiService.getTickets() // Usando a apiService para buscar tickets
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
      result[operacaoNome] += pesoLiquido; // Soma o peso líquido para cada operação
    });

    // Converte o resultado em um array para o gráfico
    return Object.entries(result).map(([nome, total]) => ({
      nome,
      total
    }));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleBarDoubleClick = (data) => {
    setSelectedOperation(data); // Armazena os dados da operação selecionada
    setCurrentPage('operationDetails'); // Muda para a página de detalhes
  };
  
  return (
    <div>
      <h2 align="center">Relatório de Saídas</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey="total"
          fill="#8884d8" 
          onClick={handleBarDoubleClick}
          onDoubleClick={handleBarDoubleClick} 
        />
      </BarChart>
    </div>
  );
};

export default Graph;
