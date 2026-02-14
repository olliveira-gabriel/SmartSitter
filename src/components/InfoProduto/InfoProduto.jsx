import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useCart } from "../../context/CartContext";
import "./InfoProduto.css";

function InfoProduto() {
  const [quantidade, setQuantidade] = useState(1);
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [precoTotal, setPrecoTotal] = useState(0);
  const [precoParcela, setPrecoParcela] = useState(0);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/1');
        const produtoData = response.data;
        
        // --- ALTERAÇÃO AQUI: Garante que o preço seja tratado como número ---
        produtoData.preco = parseFloat(produtoData.preco);
        
        setProduto(produtoData);

      } catch (error) {
        console.error("ERRO ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, []);

  // useEffect para ATUALIZAR O PREÇO
  useEffect(() => {
    if (produto && produto.preco) {
      const total = produto.preco * quantidade;
      setPrecoTotal(total);
      setPrecoParcela(total / 10);
    }
  }, [quantidade, produto]);

  const aumentar = () => setQuantidade(prev => prev + 1);
  const diminuir = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (produto) {
      addToCart(produto, quantidade);
    }
  };

  if (loading) {
    return <div className="info-produto-container"><p>Carregando produto...</p></div>;
  }
  if (!produto) {
    return <div className="info-produto-container"><p>Produto não encontrado.</p></div>;
  }

  return (
    <div className="info-produto-container">
      <h1 className="titulo-produto">{produto.nome}</h1>
      <div className="estrelas">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div className="preco-area">
        <p className="preco">R$ {precoTotal.toFixed(2).replace('.', ',')}</p>
        <p className="parcelamento">Ou 10x de R$ {precoParcela.toFixed(2).replace('.', ',')}</p>
      </div>
      <ul className="lista-descricao">
        {Array.isArray(produto.detalhes) ? produto.detalhes.map((item, index) => (
          <li key={index}>{item}</li>
        )) : <p>Sem detalhes disponíveis.</p>}
      </ul>
      <div className="compra-area">
        <div className="contador">
          <button onClick={diminuir}>-</button>
          <span>{quantidade}</span>
          <button onClick={aumentar}>+</button>
        </div>
        <button className="btn-comprar" onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
}

export default InfoProduto;