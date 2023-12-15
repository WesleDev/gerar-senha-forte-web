import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css';

import GeradorSenhas from './Components/GeradorSenhas/GeradorSenhas';
import HistoricoSenhas from './Components/HistoricoSenhas/HistoricoSenhas ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<GeradorSenhas />} />
        <Route path='/historico-senhas' element={<HistoricoSenhas />} />
      </Routes>
    </Router>
  );
}

export default App;
