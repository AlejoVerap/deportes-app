import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelector from './pages/LoginSelector';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Escenarios from './pages/Escenarios';
import Reservas from './pages/Reservas';
import Reportes from './pages/Reportes';
import HistorialReservas from './pages/HistorialReservas';
import ReservasUsuario from './pages/ReservasUsuario';
import UserDashboard from './pages/UserDashboard';

import Layout from './components/Layout';
import RutaPrivada from './components/RutaPrivada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelector />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para administradores */}
        <Route path="/admin" element={
          <RutaPrivada>
            <Layout />
          </RutaPrivada>
        }>
          <Route index element={<Reservas />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="escenarios" element={<Escenarios />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>

        {/* Rutas protegidas para usuarios normales */}
        <Route path="/usuario" element={
          <RutaPrivada>
            <Layout />
          </RutaPrivada>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="escenarios" element={<Escenarios />} />
          <Route path="reservas-usuario" element={<ReservasUsuario />} />
          <Route path="historial" element={<HistorialReservas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
