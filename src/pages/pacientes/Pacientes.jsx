import "./pacientes.css";
import { useState } from "react";


function Pacientes() {
  const [busca, setBusca] = useState("");
  
  const pacientes = [
  {
    id: 1,
    nome: "Ana Beatriz Silva",
    idade: 32,
    problema: "Infecção urinária"
  },
  {
    id: 2,
    nome: "Carlos Eduardo Ramos",
    idade: 45,
    problema: "Hipertensão descontrolada"
  },
  {
    id: 3,
    nome: "Mariana Lopes",
    idade: 27,
    problema: "Crise de ansiedade"
  },
  {
    id: 4,
    nome: "João Pedro Fernandes",
    idade: 60,
    problema: "Dores fortes na coluna"
  },
  {
    id: 5,
    nome: "Luciana Martins",
    idade: 53,
    problema: "Diabetes – glicemia alta"
  },
  {
    id: 6,
    nome: "Ricardo Menezes",
    idade: 39,
    problema: "Pneumonia leve"
  },
  {
    id: 7,
    nome: "Fernanda Costa",
    idade: 22,
    problema: "Reação alérgica"
  },
  {
    id: 8,
    nome: "Gabriel Farias",
    idade: 31,
    problema: "Febre alta e mal-estar"
  },
  {
    id: 9,
    nome: "Juliana Pereira",
    idade: 47,
    problema: "Crise de enxaqueca"
  },
  {
    id: 10,
    nome: "Rafael Monteiro",
    idade: 18,
    problema: "Luxação no ombro"
  }
];

const filtrados = pacientes.filter((m) =>
m.nome.toLowerCase().includes(busca.toLowerCase()) ||
m.problema.toLowerCase().includes(busca.toLowerCase()) ||
m.id.toString().includes(busca) ||
m.idade.toString().includes(busca)
);

  return (
    <div className="pacientes-container">
      <h1>..: Pacientes cadastrados :..</h1>
      <p className="Bleca">Lista de pacientes cadastrados no sistema</p>
        <div className="botao-busca">
          <input
            type="text"
            placeholder="Busca de pacientes"
            className="pacientes-busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        

    </div>
    
  );
}

export default Pacientes;