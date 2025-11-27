import "./atendimentos.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Atendimentos() {
  const [busca, setBusca] = useState("");
  const [atendimentos, setAtendimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/atendimentos")
      .then((res) => {
        setAtendimentos(res.data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar atendimentos:", err);
        setCarregando(false);
      });
  }, []);

  const filtrados = atendimentos.filter(
    (a) =>
      a.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      a.tipo.toLowerCase().includes(busca.toLowerCase()) ||
      a.status.toLowerCase().includes(busca.toLowerCase()) ||
      a.medico?.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.paciente?.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="atendimentos-container">
      <h1>Atendimentos</h1>
      <p>Lista de atendimentos cadastrados no sistema.</p>

      <input
        type="text"
        placeholder="Buscar por descrição, tipo, status, médico ou paciente..."
        className="atendimentos-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {carregando ? (
        <p>Carregando atendimentos...</p>
      ) : (
        <div className="atendimentos-lista">
          {filtrados.length === 0 ? (
            <p>Nenhum atendimento encontrado.</p>
          ) : (
            filtrados.map((a) => (
              <div key={a.id} className="atendimento-card">
                <h2>{a.descricao}</h2>
                <p>
                  <strong>Tipo:</strong> {a.tipo}
                </p>
                <p>
                  <strong>Preço:</strong> R$ {a.preco.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {a.status}
                </p>
                <p>
                  <strong>Médico:</strong> {a.medico?.nome || "N/A"}
                </p>
                <p>
                  <strong>Paciente:</strong> {a.paciente?.nome || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Atendimentos;
