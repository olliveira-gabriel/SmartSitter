import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from './Pages/HomePage/homePage';
import TelaLogin from './Pages/TelaLogin/TelaLogin';
import Telacadastro from './Pages/TelaCadastro/Telacadastro';
import TelaSuporte from './Pages/TelaSuporte/TelaSuporte';
import TelaProduto from './Pages/TelaProduto/TelaProduto';
import TelaCarrinho from './Pages/TelaCarrinho/TelaCarrinho'; // NOVO: Importa a tela do carrinho
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Notification from "./components/Notification/Notification";

function App() {
  const { notification, closeNotification } = useAuth();

  return (
    <Router>
      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<TelaLogin/>} />
        <Route path="/cadastro" element={<Telacadastro/>}/>
        <Route path="/produto" element={<TelaProduto/>}/>
        <Route 
          path="/suporte" 
          element={
            <ProtectedRoute>
              <TelaSuporte/>
            </ProtectedRoute>
          } 
        />
        {/* NOVA ROTA PROTEGIDA PARA O CARRINHO */}
        <Route 
          path="/carrinho" 
          element={
            <ProtectedRoute>
              <TelaCarrinho/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;