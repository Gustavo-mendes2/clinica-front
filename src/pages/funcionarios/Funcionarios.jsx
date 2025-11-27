import "./funcionarios.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Funcionarios() {
  const [busca, setBusca] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/funcionarios")
      .then((res) => {
        setFuncionarios(res.data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar funcionários:", err);
        setCarregando(false);
      });
  }, []);

  const filtrados = funcionarios.filter(
    (f) =>
      f.nome.toLowerCase().includes(busca.toLowerCase()) ||
      f.cargo.toLowerCase().includes(busca.toLowerCase()) ||
      String(f.cpf).includes(busca)
  );

  return (
    <div className="funcionarios-container">
      <h1>Funcionários</h1>
      <p>Lista de funcionários cadastrados no sistema.</p>

      <input
        type="text"
        placeholder="Buscar por nome, CPF ou cargo..."
        className="funcionarios-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {carregando ? (
        <p>Carregando funcionários...</p>
      ) : (
        <div className="funcionarios-lista">
          {filtrados.length === 0 ? (
            <p>Nenhum funcionário encontrado.</p>
          ) : (
            filtrados.map((f) => (
              <div key={f.id} className="funcionario-card">
                <h2>{f.nome}</h2>
                <p>
                  <strong>CPF:</strong> {f.cpf}
                </p>
                <p>
                  <strong>Cargo:</strong> {f.cargo}
                </p>
                <p>
                  <strong>Telefone:</strong> {f.telefone}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Funcionarios;
