import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CardLogin.css';

function CardLogin() {
  return (
    <div className="login-bg">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <div className="login-card">
              <h1>Entrar</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Digite aqui seu email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    placeholder="Digite aqui sua senha"
                    id="senha"
                    name="senha"
                  />
                  <div className="forgot">
                    <a href="#">Esqueci minha senha</a>
                  </div>
                </div>
                <button type="submit" className="btn-primary">Entrar</button>
                <button type="button" className="btn-secondary">Voltar</button>
                <p className="register">
                  Não possui conta? <a href="#">Cadastre-se</a>
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