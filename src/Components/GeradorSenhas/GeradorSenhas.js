import React, { useState } from 'react';
import axios from 'axios';
import './Styles.css';
import { useNavigate } from 'react-router-dom';
import copy from 'clipboard-copy';
import { ClipLoader } from 'react-spinners';

const GeradorSenhas = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [tamanho, setTamanho] = useState(8);
  const [tipoCaractere, setTipoCaractere] = useState(0);
  const [tipoNumero, setTipoNumero] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const gerarSenha = async () => {
    setLoading(true);

    const tempoResposta = 200;

    const tempo = setTimeout(async () => {
      try {
        const response = await axios.post(
          `https://passwordev.onrender.com/api/gerarSenha?nome=${nome}&tamanho=${tamanho}&tpCaractere=${tipoCaractere}&tpNumero=${tipoNumero}`
          //`http://localhost:8080/api/gerarSenha?nome=${nome}&tamanho=${tamanho}&tpCaractere=${tipoCaractere}&tpNumero=${tipoNumero}`
        );

        setSenha(response.data);
        setNome('');
      } catch (error) {
        alert('Erro ao gerar a senha');
      } finally {
        setLoading(false);
      }
    }, tempoResposta);
    return () => clearTimeout(tempo);
  };

  const copiarSenha = async (senha) => {
    try {
      await copy(senha);
      alert('Senha copiada para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar para a área de transferência:', error);
    }
  };

  const irParaListaSenhas = () => {
    navigate('/historico-senhas');
  };

  const handleCheckBoxCaractereChange = () => {
    setTipoCaractere(1);
    setTipoNumero('');
  };

  const handleCheckBoxNumeroChange = () => {
    setTipoNumero('S');
    setTipoCaractere(0);
  };

  return (
    <div className='container'>
      <h1>Gerador de Senhas</h1>
      <div className='usernameLabel'>Nome da Aplicação (opcional)</div>
      <input
        className='input'
        type='text'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder='Digite o nome para salvar no banco'
      />
      <div className='tamanhoSenhaLabel'>Tamanho da Senha: {tamanho}</div>
      <input
        className='slider'
        type='range'
        min={0}
        max={16}
        step={1}
        value={tamanho}
        onChange={(e) => setTamanho(parseInt(e.target.value, 10))}
      />
      <div className='checkBoxContainer'>
        <label>
          <input
            type='checkbox'
            checked={tipoCaractere === 1}
            onChange={handleCheckBoxCaractereChange}
          />
          Caractere Especial |
        </label>
        <label className='labelCheckBox'>
          <input
            type='checkbox'
            checked={tipoNumero === 'S'}
            onChange={handleCheckBoxNumeroChange}
          />
          Somente Números
        </label>
      </div>

      <button className='button' onClick={gerarSenha}>
        Gerar Senha
      </button>

      {loading ? (
        <ClipLoader
          className='cliploader'
          color='#e30842'
          size={50}
          loading={loading}
        />
      ) : (
        senha && (
          <div className='senhaContainer'>
            <div className='resultLabel'>Senha Gerada:</div>
            <div className='senhaBox' onClick={() => copiarSenha(senha)}>
              <div className='resultSenha'>{senha}</div>
            </div>
          </div>
        )
      )}
      <button className='button' onClick={irParaListaSenhas}>
        Ir para Lista de Senhas
      </button>
    </div>
  );
};

export default GeradorSenhas;
