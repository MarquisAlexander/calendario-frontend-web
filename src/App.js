import React, { useState } from 'react';
import './App.css';
import logo from "./assets/logo.svg";
import api from "./services/api";


function App() {
  const [email, setEmail] = useState('')

  async function HandleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/sessions", { email })

    const { _id } = response.data;

    console.log(_id);
  }


  return (
    <div className="container">
      <img src={logo} alt="calendario"/>

      <div className="content">
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
      </div>
    </div>
  );
}

export default App;
