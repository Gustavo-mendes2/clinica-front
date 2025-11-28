import "./pacientes.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Pacientes() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);



  useEffect(() => {
  axios
    .get("http://localhost:8080/api/pacientes")
    .then((res) => {
      // remove duplicados pelo ID
      const unicos = Array.from(
        new Map(res.data.map(p => [p.id, p])).values()
      );
      setPacientes(unicos);
      setCarregando(false);
    })
    .catch((err) => {
      console.error("Erro ao carregar pacientes:", err);
      setCarregando(false);
    });
}, []);


  const filtrados = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cpf?.toLowerCase().includes(busca.toLowerCase()) ||
      p.email?.toLowerCase().includes(busca.toLowerCase()) ||
      p.telefone?.toLowerCase().includes(busca.toLowerCase())
  );

  async function deletarPaciente(id) {
    try {
      await axios.delete(`http://localhost:8080/api/pacientes/${id}`);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      setPacienteSelecionado(null);
    } catch (err) {
      console.error("Erro ao deletar paciente:", err);
    }
  } //Função de deletar paciente -- Dps adicionar as outras páginas

  return (
    <div className="pacientes-container">
      <h1>Pacientes</h1>
      <p>Lista de pacientes cadastrados no sistema.</p>

      <input
        type="text"
        placeholder="Buscar por nome, CPF, email ou telefone..."
        className="pacientes-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {carregando ? (
        <p>Carregando pacientes...</p>
      ) : (
        <div className="pacientes-lista">
          {filtrados.length === 0 ? (
            <p>Nenhum paciente encontrado.</p>
          ) : (
            filtrados.map((p) => (
              <div key={p.id} className="paciente-card">
                <h2>{p.nome}</h2>

                <p><strong>CPF:</strong> {p.cpf || "Não informado"}</p>
                <p><strong>Email:</strong> {p.email || "Não informado"}</p>
                <p><strong>Telefone:</strong> {p.telefone || "Não informado"}</p>
                <button className="button-delete-paciente"
                onClick={() => deletarPaciente(p.id)}
                >Deletar</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default Pacientes;