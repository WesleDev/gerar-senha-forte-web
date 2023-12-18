// ListaSenhas.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdContentCopy, MdZoomOut, MdDeleteOutline } from 'react-icons/md'; // Importando ícones do React Icons
import './styles.css'; // Importe o arquivo de estilos
import copy from 'clipboard-copy';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const HistoricoSenhas = () => {
  const [senhas, setSenhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    obterSenhas();
  }, []); // O array vazio como segundo parâmetro garante que o efeito só será executado uma vez

  const obterSenhas = async () => {
    try {
      const response = await axios.get(
        'https://passwordev.onrender.com/api/senhas'
        //'http://localhost:8080/api/senhas'
      );
      setSenhas(response.data);
    } catch (error) {
      console.error('Erro ao obter as senhas:', error);
    } finally {
      setLoading(false);
    }
  };

  const copiarSenha = async (senha) => {
    try {
      await copy(senha);
      alert('Senha copiada para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar para a área de transferência:', error);
    }
  };

  const deletarSenha = async (id) => {
    try {
      await axios.delete(
        `https://passwordev.onrender.com/api/${id}`
        //`http://localhost:8080/api/${id}`
      );
      obterSenhas(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao deletar senha:', error);
    }
  };

  const irParaHome = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <h1>Senhas Cadastradas</h1>
      {loading ? (
        <ClipLoader color='#e30842' size={50} loading={loading} />
      ) : senhas.length > 0 ? (
        <ul className='listaSenhas'>
          {senhas.map((senha) => (
            <li key={senha.id} className='itemSenha'>
              <div className='infoSenha'>
                <div className='nomeSenha'>{senha.nome}</div>
              </div>
              <div className='senhaContainer'>
                <div className='senha'>{senha.senha}</div>
                <div className='buttons-icons'>
                  <MdContentCopy
                    size={20}
                    color='#000'
                    onClick={() => copiarSenha(senha.senha)}
                    className='icon'
                  />
                  <MdDeleteOutline
                    size={20}
                    color='#000'
                    onClick={() => deletarSenha(senha.id)}
                    className='icon'
                  />
                </div>
              </div>
            </li>
          ))}
          <button className='button' onClick={irParaHome}>
            Voltar
          </button>
        </ul>
      ) : (
        <div className='emptyContainer'>
          <p className='emptyText'>Nenhuma senha encontrada!</p>
          <MdZoomOut size={100} color='#888' className='icon' />
          <button className='button' onClick={irParaHome}>
            Voltar
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoricoSenhas;
