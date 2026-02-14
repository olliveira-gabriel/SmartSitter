import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Se o contexto ainda está verificando o token, não faça nada
  // Isso evita um "piscar" para a tela de login ao recarregar a página
  if (loading) {
    return <div>Carregando...</div>; // Ou um componente de spinner
  }

  // Se não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderize o componente filho (a página protegida)
  return children;
};

export default ProtectedRoute;