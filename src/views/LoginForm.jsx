import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(response => {
        // Armazenar o token e usuário
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => console.error('Erro ao fazer login:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;