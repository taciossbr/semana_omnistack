import React, {useState} from 'react';
import { Link, useHistory} from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import './styles.css'

import api from "../../services/api";
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
  const history = useHistory()
  const [id, setId] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const resp = await api.post('sessions', {id})
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', resp.data.name)
      history.push('/profile')
    } catch {
      alert('Falha no login tente novamente')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" className=""/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>

      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}