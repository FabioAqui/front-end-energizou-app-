import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Cliente {
  nome_cliente: string;
  senha: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  telefone: string;
  email: string;
}

const AddCompany: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    nome_cliente: "",
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

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCliente((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();

    // Adicione a validação para o formato do CNPJ, CEP e e-mail aqui
    if (!/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/.test(cliente.cnpj)) {
      setError(true);
      return;
    }
    if (!/^[0-9]{5}-[0-9]{3}$/.test(cliente.cep)) {
      setError(true);
      return;
    }
    if (!cliente.email.includes("@") || !cliente.email.endsWith(".com")) {
      setError(true);
      return;
    }

    try {
      await axios.post("http://localhost:3333/companies", cliente);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Adicionar Novo Cliente</h1>
      <input
        type="text"
        placeholder="Nome do Cliente"
        name="nome_cliente"
        value={cliente.nome_cliente}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Senha"
        name="senha"
        value={cliente.senha}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Razão Social"
        name="razao_social"
        value={cliente.razao_social}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
        name="cnpj"
        value={cliente.cnpj}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="CEP (XXXXX-XXX)"
        name="cep"
        value={cliente.cep}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Endereço"
        name="endereco"
        value={cliente.endereco}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Número"
        name="numero"
        value={cliente.numero}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Telefone"
        name="telefone"
        value={cliente.telefone}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="E-mail"
        name="email"
        value={cliente.email}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Adicionar</button>
      {error && "Algo deu errado! Verifique os formatos de CNPJ, CEP e e-mail."}
      <Link to="/">Ver todos os clientes</Link>
    </div>
  );
};

export default AddCompany;