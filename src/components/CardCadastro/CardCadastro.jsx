import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importar para usar as notificações
import '../CardCadastro/CardCadastro.css';

function CardCadastro() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const { showNotification } = useAuth(); // Pegar a função de notificação do contexto
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors }, 
    control,
    getValues 
  } = useForm();

  const [dadosEtapa1, setDadosEtapa1] = useState({});
  const senhaValue = watch("senha", "");

  const irParaProximaEtapa = () => {
    const valoresEtapa1 = getValues();
    setDadosEtapa1(valoresEtapa1);
    setEtapa(2);
  };

  const enviarFormulario = async (dadosEtapa2) => {
    const dadosCompletos = { ...dadosEtapa1, ...dadosEtapa2 };
    
    try {
      const response = await axios.post('http://localhost:3001/api/users/cadastro', dadosCompletos);

      if (response.status === 201) {
        showNotification(response.data.message, 'success'); // SUBSTITUI O alert()
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const errorMessage = error.response?.data?.error || 'Não foi possível completar o cadastro. Tente novamente.';
      showNotification(errorMessage, 'error'); // SUBSTITUI O alert()
    }
  };

  const handleSair = () => {
    navigate('/login'); 
  };

  return (
    <div className="cadastro-bg">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <div className="cadastro-card">
              <h1>Criar Conta</h1>

              {etapa === 1 ? (
                <form onSubmit={handleSubmit(irParaProximaEtapa)}>
                  <div className="form-group"> 
                    <label htmlFor="nome">Nome</label>
                    <input
                      {...register("nome", { required: "O nome é obrigatório", maxLength: 50 })}
                      type="text"
                      placeholder="Digite aqui seu nome"
                      id="nome"
                      autoComplete="off"
                    />
                    {errors.nome && <span style={{ color: 'red', fontSize: '14px' }}>{errors.nome.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input
                      {...register("sobrenome", { required: "O sobrenome é obrigatório" })}
                      type="text"
                      placeholder="Digite aqui seu sobrenome"
                      id="sobrenome"
                      autoComplete="off"
                    />
                    {errors.sobrenome && <span style={{ color: 'red', fontSize: '14px' }}>{errors.sobrenome.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>Data de nascimento</label>
                    <div className="data-niver" style={{ display: "flex", gap: "8px" }}>
                      <div>
                        <Controller name="dia" control={control} defaultValue="" rules={{ required: "O dia é obrigatório", min: { value: 1, message: "Inválido" }, max: { value: 31, message: "Inválido" } }}
                          render={({ field }) => (<input {...field} type="number" placeholder="Dia" />)}
                        />
                        {errors.dia && <span style={{ color: "red", fontSize: 12 }}>{errors.dia.message}</span>}
                      </div>
                      <div>
                        <Controller name="mes" control={control} defaultValue="" rules={{ required: "O mês é obrigatório", min: { value: 1, message: "Inválido" }, max: { value: 12, message: "Inválido" } }}
                          render={({ field }) => (<input {...field} type="number" placeholder="Mês"/>)}
                        />
                        {errors.mes && <span style={{ color: "red", fontSize: 12 }}>{errors.mes.message}</span>}
                      </div>
                      <div>
                        <Controller name="ano" control={control} defaultValue="" rules={{ required: "O ano é obrigatório", min: { value: 1900, message: "Inválido" }, max: { value: new Date().getFullYear(), message: "Inválido" }, minLength: { value: 4, message: "Inválido" } }}
                          render={({ field }) => (<input {...field} type="number" placeholder="Ano" />)}
                        />
                        {errors.ano && <span style={{ color: "red", fontSize: 12 }}>{errors.ano.message}</span>}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary">Próximo</button>
                  <button type="button" className="btn-secondary" onClick={handleSair}>Sair</button>
                </form>
              ) : (
                <form onSubmit={handleSubmit(enviarFormulario)}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input {...register("email", { required: "O email é obrigatório.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um email válido." } })}
                      type="email" placeholder="Digite aqui seu endereço de email" id="email" autoComplete="off"
                    />
                    {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input {...register("senha", { required: "A senha é obrigatória.", minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres." } })}
                      type="password" placeholder="Digite aqui sua senha" id="senha" autoComplete="off"
                    />
                    {errors.senha && <span style={{ color: "red", fontSize: "14px" }}>{errors.senha.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input {...register("confirmarSenha", { required: "Confirme sua senha.", validate: (value) => value === senhaValue || "As senhas não coincidem." })}
                      type="password" placeholder="Digite novamente sua senha" id="confirmarSenha" autoComplete="off"
                    />
                    {errors.confirmarSenha && <span style={{ color: "red", fontSize: "14px" }}>{errors.confirmarSenha.message}</span>}
                  </div>
                  <button type="submit" className="btn-primary">Concluir</button>
                  <button type="button" className="btn-secondary" onClick={() => setEtapa(1)}>Voltar</button>
                  <div className="texto-privacidade">
                    <p>
                      Leia nossas <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">Políticas de Privacidade</a> e <br />
                      <a href="/termos-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
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