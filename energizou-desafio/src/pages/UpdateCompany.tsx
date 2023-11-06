import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Empresa {
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

const UpdateCompanies: React.FC = () => {
  const [empresa, setEmpresa] = useState<Empresa>({
    nome_empresa: "",
    senha: "",
    razao_social: "",
    cnpj: "",
    cep: "",
    endereco: "",
    numero: "",
    telefone: "",
    email: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const empresaId = location.pathname.split("/")[2];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmpresa((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();

    // Adicione a validação para o formato do CNPJ, CEP e e-mail aqui
    if (!/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/.test(empresa.cnpj)) {
      setError(true);
      return;
    }
    if (!/^[0-9]{5}-[0-9]{3}$/.test(empresa.cep)) {
      setError(true);
      return;
    }
    if (!empresa.email.includes("@") || !empresa.email.endsWith(".com")) {
      setError(true);
      return;
    }

    try {
      await axios.put(`http://localhost:3333/companies${empresaId}`, empresa);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Company</h1>
      <input
        type="text"
        placeholder="Nome da Empresa"
        name="nome_empresa"
        value={empresa.nome_empresa}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Senha"
        name="senha"
        value={empresa.senha}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Razão Social"
        name="razao_social"
        value={empresa.razao_social}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
        name="cnpj"
        value={empresa.cnpj}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="CEP (XXXXX-XXX)"
        name="cep"
        value={empresa.cep}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Endereço"
        name="endereco"
        value={empresa.endereco}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Número"
        name="numero"
        value={empresa.numero}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Telefone"
        name="telefone"
        value={empresa.telefone}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="E-mail"
        name="email"
        value={empresa.email}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong! Check the CNPJ, CEP, and email formats."}
      <Link to="/">See all Companies</Link>
    </div>
  );
};

export default UpdateCompanies;