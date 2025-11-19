import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Medicos from "./pages/medicos/Medicos";
import Pacientes from "./pages/pacientes/Pacientes";
import Atendimentos from "./pages/atendimento/Atendimentos";
import Pagamentos from "./pages/pagamentos/Pagamentos";
import Funcionarios from "./pages/funcionarios/Funcionarios";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="navItem">
          Home
        </Link>
        <Link to="/Medicos" className="navItem">
          Medicos
        </Link>
        <Link to="/Pacientes" className="navItem">
          Pacientes
        </Link>
        <Link to="/Atendimentos" className="navItem">
          Atendimentos
        </Link>
        <Link to="/Funcionarios" className="navItem">
          Funcionarios
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Medicos" element={<Medicos />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/Atendimentos" element={<Atendimentos />} />
        <Route path="/Funcionarios" element={<Funcionarios />} />
      </Routes>
    </Router>
  );
}

export default App;
