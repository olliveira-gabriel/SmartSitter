import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Logo from "../../assets/Img/Logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

function NavbarCadastro() {
  return (
    <>
      <Navbar bg="" data-bs-theme="">
        <Container fluid className="ps-5">
          <Navbar.Brand className="logo ms-3" as={Link} to="/home">
            <img src={Logo} alt="SmartSitter" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarCadastro
