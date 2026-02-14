import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './CardLogin.css';

function CardLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login, showNotification } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        senha
      });
      
      login(response.data.token);
      showNotification('Login bem-sucedido!', 'success');
      navigate('/home'); 

    } catch (error) {
      console.error("Erro no login:", error);
      const errorMessage = error.response?.data?.error || 'Email ou senha inválidos.';
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <div className="login-bg">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <div className="login-card">
              <h1>Entrar</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Digite aqui seu email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    placeholder="Digite aqui sua senha"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <div className="forgot">
                    <a href="#">Esqueci minha senha</a>
                  </div>
                </div>
                <button type="submit" className="btn-primary">Entrar</button>
                <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Voltar</button>
                <p className="register">
                    Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CardLogin;