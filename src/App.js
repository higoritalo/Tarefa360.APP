import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './paginas/Home/home';
import { Usuarios } from './paginas/usuarios/usuarios';
import { NovoUsuario } from './paginas/novoUsuario/novoUsuario';
import { EditarUsuario } from './paginas/editarUsuario/editarUsuario';
import { Historias } from './paginas/Historias/Historias'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />
        <Route path='/historias' element={<Historias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;