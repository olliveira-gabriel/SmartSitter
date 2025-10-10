import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import Logo from '../../assets/Img/Logo.png';
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="navbar-home" variant="dark">
      <Container fluid className=" ps-5 d-flex align-items-center justify-content-between">

        <Navbar.Brand as={Link} to="/home" className="logo ms-3">
          <img src={Logo} alt="SmartSitter" />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse  className="justify-content-between">


          <Nav className="mx-auto text-center nav-center">
            <Nav.Link as={Link} to="/app" className="nav-link-custom">App</Nav.Link>
            <Nav.Link as={Link} to="/aparelho" className="nav-link-custom">Aparelho</Nav.Link>
            <Nav.Link as={Link} to="/suporte" className="nav-link-custom">Suporte</Nav.Link>


            <Nav.Link as={Link} to="/login" className="nav-link-custom d-lg-none">Entrar</Nav.Link>
          </Nav>

          <Nav className=" pe-5 d-none d-lg-flex  ">
            <Nav.Link as={Link} to="/login" className="nav-link-entrar me-3">Entrar</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
