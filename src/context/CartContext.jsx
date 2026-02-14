import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showNotification, token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const response = await axios.get('http://localhost:3001/api/cart', config);
      const formattedCart = response.data.map(item => ({
        ...item,
        preco: parseFloat(item.preco) || 0,
        quantity: parseInt(item.quantidade, 10) || 1,
      }));
      setCart(formattedCart);
    } catch (error) {
      console.error("Erro ao buscar o carrinho:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, token]);

  const addToCart = async (product, quantity) => {
    if (!isAuthenticated) return;
    try {
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.post('http://localhost:3001/api/cart', {
        produtoId: product.id,
        quantidade: quantity
      }, config);
      await fetchCart();
      showNotification(`${product.nome} adicionado ao carrinho!`, 'success');
    } catch (error) {
      showNotification('Erro ao adicionar item.', 'error');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const quantityNum = parseInt(newQuantity, 10);
    if (isNaN(quantityNum) || quantityNum < 0) {
      setCart(current => [...current]);
      return;
    }

    if (quantityNum === 0) {
      return removeFromCart(productId);
    }

    if (!isAuthenticated) return;

    try {
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const response = await axios.put(`http://localhost:3001/api/cart/${productId}`, { quantidade: quantityNum }, config);
      const updatedItemFromServer = response.data.item;

      if (!updatedItemFromServer) {
        throw new Error("Resposta inválida do servidor.");
      }

      setCart(currentCart =>
        currentCart.map(item =>
          item.id === productId
            ? {
              ...updatedItemFromServer,
              preco: parseFloat(updatedItemFromServer.preco) || 0,
              quantity: parseInt(updatedItemFromServer.quantidade, 10) || 1
            }
            : item
        )
      );
    } catch (error) {
      showNotification('Erro ao atualizar o item.', 'error');
      fetchCart();
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;
    try {
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`http://localhost:3001/api/cart/${productId}`, config);
      setCart(currentCart => currentCart.filter(item => item.id !== productId));
      showNotification(`Item removido do carrinho.`, 'error');
    } catch (error) {
      showNotification('Erro ao remover o item.', 'error');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }
    try {
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete('http://localhost:3001/api/cart', config);
      setCart([]);
    } catch (error) {
      console.error('Erro ao limpar carrinho no backend:', error);
      showNotification('Não foi possível limpar o carrinho.', 'error');
    }
  };

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);