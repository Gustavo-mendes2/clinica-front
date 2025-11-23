import "./pacientes.css";

function Paciente({ paciente, onClick }) {
  return (
    <div className="paciente-item">
      onClick = {() => onClick(paciente)}
      <h3>{paciente.nome}</h3>
      <p>Idade: {paciente.idade}</p>
      <p>CPF: {paciente.cpf}</p>
    </div>
  );
}

export default Paciente;
