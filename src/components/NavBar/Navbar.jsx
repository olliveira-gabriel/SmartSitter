import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'; 
import Logo from '../../assets/Img/Logo.png'; 

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        

        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={Logo} alt="logo" className="brand-logo" />
        </Navbar.Brand>

        <Nav className="nav-center">
          <Nav.Link href="#app" className="nav-link-custom">App</Nav.Link>
          <Nav.Link href="#aparelho" className="nav-link-custom">Aparelho</Nav.Link>
          <Nav.Link href="#suporte" className="nav-link-custom">Suporte</Nav.Link>
        </Nav>

        <Nav>
        <Nav.Link href="#suporte" className="nav-link-custom">Entrar</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
  
export default CustomNavbar;
