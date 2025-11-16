import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Medicos from "./pages/medicos/Medicos";
import Pacientes from "./pages/pacientes/Pacientes";
import Atendimentos from "./pages/atendimento/Atendimentos";
import Pagamentos from "./pages/pagamentos/Pagamentos";
import Funcionarios from "./pages/funcionarios/Funcionarios";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/Medicos" style={{ marginRight: "10px" }}>
          Medicos
        </Link>
        <Link to="/Pacientes">Pacientes</Link>
        <Link to="/Atendimentos" style={{ marginLeft: "10px" }}>
          Atendimentos
        </Link>
        <Link to="/Pagamentos" style={{ marginLeft: "10px" }}>
          Pagamentos
        </Link>
        <Link to="/Funcionarios" style={{ marginLeft: "10px" }}>
          Funcionarios
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Medicos" element={<Medicos />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/Atendimentos" element={<Atendimentos />} />
        <Route path="/Pagamentos" element={<Pagamentos />} />
        <Route path="/Funcionarios" element={<Funcionarios />} />
      </Routes>
    </Router>
  );
}

export default App;
