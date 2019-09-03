import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import api from '../services/api';
import Logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import san from '../assets/san.jpeg'
import deb from '../assets/deb.jpeg'

export default function Main ({ match }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      })
      setUsers(response.data);
    }
    loadUsers()
  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter(user => user._id !== id))
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter(user => user._id !== id))
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={Logo} alt="Tindev"/>
      </Link>
        { users.length > 0 ? (
        <ul>
          <li>
            <img src={san} alt="San"/>
            <footer>
              <strong>San</strong>
              <p>idontwannabeyouanymore.</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={() => {}}>
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button" onClick={() => {}}>
                <img src={like} alt="Like"/>
              </button>
            </div>
          </li>
          <li>
            <img src={deb} alt="San"/>
            <footer>
              <strong>Débora</strong>
              <p>"Desde que a minha vida saiu dos trilhos, sinto que posso ir a qualquer lugar"</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={() => {}}>
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button" onClick={() => {}}>
                <img src={like} alt="Like"/>
              </button>
            </div>
          </li>
          {users.map(user => (
            <li key={user._id}>
            <img src={user.avatar} alt={user.name}/>
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="Like"/>
              </button>
            </div>
          </li>
          ))}
        </ul>
        ) : (
          <div className="empty">Acabou :(</div>
        ) }
    </div>
  );
};