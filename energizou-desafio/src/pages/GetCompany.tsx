import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

const GetCompany: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    if (id) {
      // Verificar se o 'id' é um número válido
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        const fetchEmpresa = async (id: number) => {
          try {
            const res = await axios.get<Empresa>(`http://localhost:3333/companies/${id}`);
            setEmpresa(res.data);
          } catch (err) {
            console.log(err);
          }
        };

        fetchEmpresa(parsedId);
      }
    }
  }, [id]);

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
      {empresa ? (
        <div>
          <h1>Empresa Pesquisada</h1>
          <div className="empresa">
            <div className="empresa">
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
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      <button className="addEmpresa">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Adicionar nova empresa
        </Link>
      </button>
    </div>
  );
};

export default GetCompany;