import { useEffect, useState } from "react";
import axios from "axios";
import "./pacientes.css";
import Paciente from "./Paciente";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/pacientes")
      .then((res) => setPacientes(res.data))
      .catch((err) => console.log(err));
  }, []);
  const pacientesFiltrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function handleClickPaciente(p) {
  setPacienteSelecionado(p);
  console.log("Paciente selecionado:", p);
}

  return (
    
      <div className="pacientes-container">
        <h1>Pacientes</h1>
        <p>Pacientes no sistema</p>

        <input
        type="text"
        placeholder=":Buscar paciente por nome:"
        className="paciente-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        />

        {pacientesFiltrados.map((p) => (
          <Paciente 
            key={p.id} 
            paciente={p}
            onClick={handleClickPaciente}
          />
        ))}
      </div>
  );
}

export default Pacientes;
