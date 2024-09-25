import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Base URL da API

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    const { access, refresh, user_id, username: userUsername } = response.data;

    const user = {
      id: user_id,
      username: userUsername,
    };

    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('username', userUsername);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    localStorage.setItem('tokenExpiration', expirationDate.toISOString());

    return user; // Retorna o usuário após o login
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Erro ao fazer login, tente novamente.'
    );
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const authService = {
  login,
  getToken,
};

export default authService;
