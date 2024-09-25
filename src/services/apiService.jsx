// src/services/apiService.js

import axios from 'axios';
import authService from './authService';

const API_URL = 'http://127.0.0.1:8000/api'; // Base URL da API

// Função para buscar tickets com filtros opcionais
const getTickets = (operacao = '', sequencia = '', criacao = '') => {
  let url = `${API_URL}/tickets/`;
  const params = [];

  if (operacao) params.push(`operacao=${operacao}`);
  if (sequencia) params.push(`sequencia=${sequencia}`);
  if (criacao) params.push(`criacao=${criacao}`);

  if (params.length > 0) {
    url += '?' + params.join('&');
  }

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para buscar um ticket por ID
const getTicketById = (ticketId) => {
  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(`${API_URL}/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getUsers = () => {
  const url = `${API_URL}/users/`; // Altere a URL de acordo com a sua API

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const apiService = {
  getTickets,
  getTicketById, // Adiciona a função para buscar ticket por ID
  getUsers,
};

export default apiService;
