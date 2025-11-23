import { useEffect, useState } from "react";
import axios from "axios";
import "./pacientes.css";
import Paciente from "./Paciente";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/pacientes")
      .then((res) => setPacientes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="pacientes-container">
        <h1>Pacientes</h1>

        {pacientes.map((p) => (
          <Paciente key={p.id} paciente={p} />
        ))}
      </div>
    </div>
  );
}

export default Pacientes;
