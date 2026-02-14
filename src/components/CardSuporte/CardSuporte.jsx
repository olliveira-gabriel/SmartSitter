import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./CardSuporte.css";

function CardSuporte() {
  const [assunto, setAssunto] = useState('');
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { token, showNotification } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      previewImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImagem(file);
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
        showNotification("Sessão expirada. Por favor, faça login novamente.", 'error');
        return;
    }

    const formData = new FormData();
    formData.append('assunto', assunto);
    formData.append('TituloSuporte', titulo);
    formData.append('MensagemSuporte', mensagem);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      };

      const response = await axios.post('http://localhost:3001/api/support/tickets', formData, config);
      
      showNotification(response.data.message, 'success');
      
      // Limpar formulário
      setAssunto('');
      setTitulo('');
      setMensagem('');
      setImagem(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Erro ao enviar ticket:', error);
      const errorMessage = error.response?.data?.msg || 'Falha ao enviar o ticket.';
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <div className="suporte-bg">
      <Container fluid className="suporte-container">
        <h1>Suporte</h1>
        <form className="card-suporte" onSubmit={handleSubmit}>
          <label htmlFor="assunto">Assunto</label>
          <select id="assunto" value={assunto} onChange={(e) => setAssunto(e.target.value)} required>
            <option value="">Selecione o assunto</option>
            <option value="defeito">Produto com defeito</option>
            <option value="duvida">Dúvida</option>
            <option value="outros">Outros</option>
          </select>

          <label htmlFor="TituloSuporte">Título</label>
          <input type="text" id="TituloSuporte" value={titulo} onChange={(e) => setTitulo(e.target.value)} required autoComplete="off" />

          <label htmlFor="MensagemSuporte">Mensagem</label>
          <textarea id="MensagemSuporte" value={mensagem} onChange={(e) => setMensagem(e.target.value)} required autoComplete="off"></textarea>

          <div
            className={`upload-box ${isDragOver ? "dragover" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("imagemInput").click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <div className="upload-text">
                <Link2 className="upload-icon" />
                <p>Selecione ou arraste uma imagem</p>
              </div>
            )}
            <input
              type="file"
              id="imagemInput"
              name="imagem"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit">Concluir</button>
        </form>
      </Container>
    </div>
  );
}

export default CardSuporte;