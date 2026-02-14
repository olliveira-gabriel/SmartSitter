import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './ItemCarrinho.css';
import { Trash2 } from 'lucide-react';

function ItemCarrinho({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [inputValue, setInputValue] = useState(item.quantity);

  useEffect(() => {
    setInputValue(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const newQuantity = parseInt(inputValue, 10);
    // Só envia para a API se o valor for um número válido e diferente do original
    if (!isNaN(newQuantity) && newQuantity !== item.quantity) {
      updateQuantity(item.id, newQuantity);
    } else {
      // Caso contrário, reverte para o valor original do carrinho
      setInputValue(item.quantity);
    }
  };

  // Garante que o usuário possa pressionar Enter para confirmar
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
      e.target.blur(); // Tira o foco do input
    }
  };

  return (
    <div className="item-carrinho">
      <img src={item.imagem_url || 'https://via.placeholder.com/100'} alt={item.nome} className="item-imagem" />
      <div className="item-detalhes">
        <p className="item-nome">{item.nome}</p>
        <p className="item-preco">R$ {parseFloat(item.preco).toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="item-acoes">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown} // Adicionado para usabilidade
          className="item-quantidade"
          min="0"
        />
        <button onClick={() => removeFromCart(item.id)} className="item-remover">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default ItemCarrinho;