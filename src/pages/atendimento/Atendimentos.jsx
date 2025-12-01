import "./atendimentos.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Atendimentos() {
  const [busca, setBusca] = useState("");
  const [atendimentos, setAtendimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);

  // novo atendimento
  const [novoAtendimento, setNovoAtendimento] = useState({
    descricao: "",
    tipo: "",
    preco: "",
    status: "",
    medicoId: "",
    pacienteId: ""
  });

  useEffect(() => {
    setCarregando(true);

    axios
      .get("http://localhost:8080/api/atendimentos")
      .then((res) => {
        // remove duplicados caso haja repetição no backend
        const unicos = Array.from(new Map(res.data.map(a => [a.id, a])).values());
        setAtendimentos(unicos);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar atendimentos:", err);
        setCarregando(false);
      });
  }, []);

  // filtro
  const filtrados = atendimentos.filter((a) => {
    const b = busca.toLowerCase();
    return (
      a.descricao.toLowerCase().includes(b) ||
      a.tipo.toLowerCase().includes(b) ||
      a.status.toLowerCase().includes(b) ||
      a.medico?.nome.toLowerCase().includes(b) ||
      a.paciente?.nome.toLowerCase().includes(b)
    );
  });

  // deletar
  async function deletarAtendimento(id) {
    try {
      await axios.delete(`http://localhost:8080/api/atendimentos/${id}`);
      setAtendimentos((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Erro ao deletar atendimento:", err);
    }
  }

  // criar
  async function criarAtendimento(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/atendimentos",
        novoAtendimento
      );

      setAtendimentos((prev) => [...prev, res.data]);

      // limpar e fechar modal
      setNovoAtendimento({
        descricao: "",
        tipo: "",
        preco: "",
        status: "",
        medicoId: "",
        pacienteId: ""
      });

      setMostrarModal(false);
    } catch (err) {
      console.error("Erro ao criar atendimento:", err);
    }
  }

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

      <button className="button-add" onClick={() => setMostrarModal(true)}>
        + Adicionar Atendimento
      </button>

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

                <p><strong>Tipo:</strong> {a.tipo}</p>
                <p><strong>Preço:</strong> R$ {a.preco.toFixed(2)}</p>
                <p><strong>Status:</strong> {a.status}</p>
                <p><strong>Médico:</strong> {a.medico?.nome || "N/A"}</p>
                <p><strong>Paciente:</strong> {a.paciente?.nome || "N/A"}</p>

                <button
                  className="button-delete-atendimento"
                  onClick={() => deletarAtendimento(a.id)}
                >
                  Deletar
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Novo Atendimento</h2>

            <form onSubmit={criarAtendimento} className="form-atendimento">
              <div className="form-row">

                <input
                  type="text"
                  placeholder="Descrição"
                  value={novoAtendimento.descricao}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, descricao: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Tipo"
                  value={novoAtendimento.tipo}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, tipo: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Preço"
                  value={novoAtendimento.preco}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, preco: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Status"
                  value={novoAtendimento.status}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, status: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="ID do Médico"
                  value={novoAtendimento.medicoId}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, medicoId: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="ID do Paciente"
                  value={novoAtendimento.pacienteId}
                  onChange={(e) =>
                    setNovoAtendimento({ ...novoAtendimento, pacienteId: e.target.value })
                  }
                />

              </div>

              <div className="buttons">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Atendimentos;
