import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../CardCadastro/CardCadastro.css';

function CardCadastro() {

  const [etapa, setEtapa] = useState(1);


  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    sobrenome: '',
    dia: '',
    mes: '',
    ano: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });


  const aoDigitar = (evento) => {
    const { name, value } = evento.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };


  const irParaProximaEtapa = (evento) => {
    evento.preventDefault();
    setEtapa(2);
  };


  const enviarFormulario = (evento) => {
    evento.preventDefault();
    console.log('Dados enviados:', dadosFormulario);
  };

  return (
    <div className="cadastro-bg">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <div className="cadastro-card">
              <h1>Criar Conta</h1>

              {etapa === 1 ? (

                <form onSubmit={irParaProximaEtapa}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      type="text"
                      placeholder="Digite aqui seu nome"
                      id="nome"
                      name="nome"
                      value={dadosFormulario.nome}
                      onChange={aoDigitar}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input
                      type="text"
                      placeholder="Digite aqui seu sobrenome"
                      id="sobrenome"
                      name="sobrenome"
                      value={dadosFormulario.sobrenome}
                      onChange={aoDigitar}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label>Data de nascimento</label>
                    <div className="data-niver">
                      <input
                        type="text"
                        id="dia"
                        name="dia"
                        placeholder="Dia"
                        maxLength="2"
                        value={dadosFormulario.dia}
                        onChange={aoDigitar}
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        id="mes"
                        name="mes"
                        placeholder="Mês"
                        maxLength="2"
                        value={dadosFormulario.mes}
                        onChange={aoDigitar}
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        id="ano"
                        name="ano"
                        placeholder="Ano"
                        maxLength="4"
                        value={dadosFormulario.ano}
                        onChange={aoDigitar}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">Próximo</button>
                  <button type="button" className="btn-secondary">Sair</button>
                </form>
              ) : (

                <form onSubmit={enviarFormulario}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      placeholder="Digite aqui seu endereço de email"
                      id="email"
                      name="email"
                      value={dadosFormulario.email}
                      onChange={aoDigitar}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                      type="password"
                      placeholder="Digite aqui sua senha"
                      id="senha"
                      name="senha"
                      value={dadosFormulario.senha}
                      onChange={aoDigitar}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                      type="password"
                      placeholder="Digite aqui sua senha"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={dadosFormulario.confirmarSenha}
                      onChange={aoDigitar}
                      autoComplete="off"
                    />
                  </div>

                  <button type="submit" className="btn-primary">Concluir</button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setEtapa(1)}
                  >
                    Voltar
                  </button>
                  <div className="texto-privacidade">
                  <p>
                    Leia nossas{' '}
                    <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
                    Políticas de Privacidade
                    </a>{' '}
                    e{' '}<br/>
                    <a href="/termos-uso" target="_blank" rel="noopener noreferrer">
                    Termos de Uso
                    </a>
                </p>
                  </div>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CardCadastro;
