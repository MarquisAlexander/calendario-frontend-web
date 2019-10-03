import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
    const [email, setEmail] = useState('')

  async function HandleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/sessions", { email })

    const { _id } = response.data;

    // salvando o id do usuario localmente (f12, armazenamento/aplicação)
    localStorage.setItem("user", _id);

    // mandando o usuário para a dashboard
    history.push("/dashboard");
  }
    return (
        <>
        <p>
          Oferecendo soluções para <strong>otimizar</strong> um bem na sua vida que dinheiro <strong>algum</strong> pode comprar... tempo
        </p>

        <form onSubmit={HandleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
          type="email"
          id="email"
          placeholder="seu melhor email" 
          value={email}
          onChange={event => setEmail(event.target.value)}
          />
          
          <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    )
}