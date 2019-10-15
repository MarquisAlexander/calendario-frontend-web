import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] =useState(null);

//mostrando preview da foto
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem("user");
//buscando os inputs 
        data.append('thumbnail', thumbnail);
        data.append("company", company);
        data.append("techs", techs);
        data.append("price", price);

        await api.post("/spots", data, {
            headers: {user_id}
        })

        history.push('/dashboard');
    }

    return (
//formulário de cadastro de uma nova data
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${ preview })` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">Assunto para lembrar *</label>
            <input 
            id="company"
            placeholder="O que você não pode esquecer de fazer no dia do lembrete"
            value={company}
            onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Temas * <span>(separadas por vírgulas)</span></label>
            <input 
            id="techs"
            placeholder="Quais tecnologias usam"
            value={techs}
            onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="valor">Quanto devo gastar no dia * <span>(Não deixe em brando, isso pode lê custar caro)</span></label>
            <input 
            id="price"
            placeholder="valor cobrado por dia"
            value={price}
            onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Salvar lembrete</button>
        </form>
    )
}