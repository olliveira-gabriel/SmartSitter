import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { X, Menu, ShoppingCart, LogOut } from 'lucide-react'; // Importa o ícone de LogOut
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Logo from '../../assets/Img/Logo.png';
import './NavBar.css';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  // --- ALTERAÇÃO AQUI ---
  // Pega também o objeto 'user' do contexto
  const { isAuthenticated, logout, user } = useAuth();
  const { cart } = useCart();

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalItems(total);
  }, [cart]);


  const handleLogout = () => {
    logout();
    setExpanded(false);
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-home"
      variant="dark"
      expanded={expanded}
      fixed="top"
    >
      <Container fluid className="ps-5 d-flex align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/home" className="logo ms-3">
          <img src={Logo} alt="SmartSitter" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="custom-toggle"
          onClick={() => setExpanded(expanded ? false : "true")}
        >
          {expanded ? <X size={28} color="#EEF4F5" /> : <Menu size={28} color="#EEF4F5" />}
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="mx-auto text-center nav-center">
            <Nav.Link as={Link} to="/app" className="nav-link-custom" onClick={() => setExpanded(false)}>App</Nav.Link>
            <Nav.Link as={Link} to="/produto" className="nav-link-custom" onClick={() => setExpanded(false)}>Aparelho</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/suporte" className="nav-link-custom" onClick={() => setExpanded(false)}>Suporte</Nav.Link>
            )}
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout} className="nav-link-custom d-lg-none">Sair</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link-custom d-lg-none" onClick={() => setExpanded(false)}>Entrar</Nav.Link>
            )}
          </Nav>
           {/* --- SEÇÃO MODIFICADA --- */}
          <Nav className="pe-5 d-none d-lg-flex align-items-center">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/carrinho" className="nav-link-cart me-3">
                  <ShoppingCart color="#EEF4F5" />
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Nav.Link>
                <span className="navbar-user-name me-2">{user?.nome}</span>
                <Nav.Link onClick={handleLogout} className="nav-link-logout-icon">
                  <LogOut size={22} color="#EEF4F5" />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link-entrar">Entrar</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;