import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ setUser, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(response => {
        // Armazenar o token e usuário
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // Adiciona 1 dia
      localStorage.setItem('tokenExpiration', expirationDate.toISOString());
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        setError('Credenciais inválidas. Tente novamente.'); // Define a mensagem de erro
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuário</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
