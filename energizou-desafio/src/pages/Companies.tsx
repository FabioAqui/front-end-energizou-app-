import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Empresa {
  id: number;
  nome_empresa: string;
  senha: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  telefone: string;
  email: string;
}

const Companies: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchId, setSearchId] = useState<number | null>(null);

  const handleSearch = () => {
    if (searchId !== null) {
      // Redirecionar para a página de pesquisa com o ID inserido
      window.location.href = `/search/${searchId}`;
    }
  };


  useEffect(() => {
    const fetchAllEmpresas = async () => {
      try {
        const res = await axios.get<Empresa[]>("http://localhost:3333/companies");
        setEmpresas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmpresas();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/companies/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>Empresas cadastradas</h1>
      <div className="empresas">
        {empresas.map((empresa) => (
          <div key={empresa.id} className="empresa">
            <h2>{empresa.nome_empresa}</h2>
            <p>Id: {empresa.id}</p>
            <p>{empresa.razao_social}</p>
            <p>CNPJ: {empresa.cnpj}</p>
            <p>CEP: {empresa.cep}</p>
            <p>Endereço: {empresa.endereco}, {empresa.numero}</p>
            <p>Telefone: {empresa.telefone}</p>
            <p>E-mail: {empresa.email}</p>
            <button className="delete" onClick={() => handleDelete(empresa.id)}>
              Delete
            </button>
            <button className="update">
                <Link to={`/update/${empresa.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                Atualizar
                </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addEmpresa">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Adicionar nova empresa
        </Link>
      </button>
      <div>
        <input
            type="number"
            placeholder="digite o id"
            value={searchId || ""}
            onChange={(e) => setSearchId(parseInt(e.target.value))}
        />
         <button className="getEmpresa" onClick={handleSearch}>
          Pesquisar empresa pelo id
        </button>
      </div>
    </div>
  );
};

export default Companies;