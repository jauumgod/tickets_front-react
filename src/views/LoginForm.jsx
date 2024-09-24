import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ setUser, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado para controle de carregamento
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento

    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(response => {
        const { access, refresh, user_id, username: userUsername, empresas } = response.data;

        setUser({
          id: user_id,
          username: userUsername,
          empresas: empresas, // Se for uma lista, considere como vai utilizar
        });
        console.log(response);
        const userID = user_id[0];
        const empresaID = empresas[0];

        localStorage.setItem('token', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('userId', userID);
        localStorage.setItem('username', userUsername);
        localStorage.setItem('userEmpresaId', empresaID);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());

        onLoginSuccess();
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.detail || 'Credenciais inválidas. Tente novamente.');
        } else {
          setError('Erro na conexão com o servidor. Tente novamente mais tarde.');
        }
      })
      .finally(() => {
        setLoading(false); // Termina o carregamento
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Carregando...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
