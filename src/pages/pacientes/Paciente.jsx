import "pacientes.css";

function Paciente({ paciente }) {
  return (
    <div className="paciente-item">
      <strong>{paciente.nome}</strong> — {paciente.cpf}
    </div>
  );
}

export default Paciente;
