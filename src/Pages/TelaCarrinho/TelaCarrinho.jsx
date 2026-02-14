import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import NavBarCadastro from '../../components/NavBar/NavbarCadastro';
import ItemCarrinho from '../../components/ItemCarrinho/ItemCarrinho';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './TelaCarrinho.css';

function TelaCarrinho() {
  const { cart, clearCart } = useCart();
  const { showNotification } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + (item.preco * item.quantity), 0);

  const handleFinalizarCompra = async () => {
    await clearCart();
    showNotification('Compra concluída com sucesso!', 'success');
    navigate('/home');
  };

  return (
    <div className="carrinho-bg">
      <NavBarCadastro />
      <Container className="carrinho-container">
        <div className="carrinho-header">
            <h1>Meu Carrinho</h1>
            {cart.length > 0 && <p>{cart.length} item(s)</p>}
        </div>

        {cart.length === 0 ? (
          <div className="carrinho-vazio">
            <p>Seu carrinho está vazio.</p>
            <Button as={Link} to="/produto" className="btn-ver-produtos">Ver produtos</Button>
          </div>
        ) : (
          <Row>
            <Col lg={8}>
              <div className="lista-itens">
                {cart.map(item => (
                  <ItemCarrinho key={item.id} item={item} />
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <div className="resumo-pedido">
                <h2>Resumo do Pedido</h2>
                <div className="resumo-linha">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <Button variant="success" className="btn-finalizar w-100" onClick={handleFinalizarCompra}>
                  Finalizar Compra
                </Button>
                <Button variant="outline-danger" className="btn-limpar w-100 mt-2" onClick={clearCart}>
                  Limpar Carrinho
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default TelaCarrinho;