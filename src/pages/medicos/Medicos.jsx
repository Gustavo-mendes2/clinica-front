import "./medicos.css";
import { useState } from "react";


function Medicos() {
const [busca, setBusca] = useState("");


const medicos = [
{ id: 1, nome: "Dr. Everton uneb", especialidade: "Urologista", crm: "12345" },
{ id: 2, nome: "Dra. Silas uneb", especialidade: "Dermatologia", crm: "67890" },
{ id: 3, nome: "Dr. Gustavo uneb", especialidade: "Ginecologista", crm: "11223" }
];


const filtrados = medicos.filter((m) =>
m.nome.toLowerCase().includes(busca.toLowerCase()) ||
m.especialidade.toLowerCase().includes(busca.toLowerCase()) ||
m.crm.includes(busca)
);


return (
<div className="medicos-container">
<h1>Médicos</h1>
<p>Lista de médicos cadastrados no sistema.</p>


<input
type="text"
placeholder="Buscar por nome, CRM ou especialidade..."
className="medicos-busca"
value={busca}
onChange={(e) => setBusca(e.target.value)}
/>


<div className="medicos-lista">
{filtrados.length === 0 ? (
<p>Nenhum médico encontrado.</p>
) : (
filtrados.map((m) => (
<div key={m.id} className="medico-card">
<h2>{m.nome}</h2>
<p><strong>Especialidade:</strong> {m.especialidade}</p>
<p><strong>CRM:</strong> {m.crm}</p>
</div>
))
)}
</div>
</div>
);
}


export default Medicos;
