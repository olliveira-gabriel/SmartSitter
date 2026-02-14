import React from 'react';
// A CORREÇÃO FINAL ESTÁ AQUI: O nome da pasta era "CardsProdtuos"
import CardsProdutos from '../CardsProdtuos/ContainerProdutos.jsx'; 
import { Container, Row, Col } from 'react-bootstrap';
import './SectionProdutos.css';
import ImgApp from '../../assets/Img/App.png';
import Linha from '../../assets/img/line.png';

function SectionProdutos() {
  return (
        <div>
        <h1 className='explore'>Explore nossos produtos</h1>
        <Container className='container-cards'>
            <Row className="align-items-center justify-content-center">
            <Col md={6} className="text-center">
                <CardsProdutos
                ImgProduto={ImgApp}
                TituloProduto={
                    <>
                    Aparelho Inteligente<br />SmartSitter
                    </>
                }
                TamanhoProduto="0MB"
                TituloBotao="Comprar"
                DestinoBotao="/produto" 
                />
            </Col>
            <Col md={1} className="text-center d-flex align-items-center justify-content-center">
                <img src={Linha} alt="Divisor" className="img-fluid" />
            </Col>
            <Col md={5} className="text-center">
                <CardsProdutos
                ImgProduto={ImgApp}
                TituloProduto="App SmartSitter"
                TamanhoProduto="0MB"
                TituloBotao="Baixar"
                DestinoBotao=""
                />
            </Col>
            </Row>
        </Container>
        </div>
  );
}

export default SectionProdutos;