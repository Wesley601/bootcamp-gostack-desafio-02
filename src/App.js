import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepository(response.data))
      .catch(error => console.error(error))
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
          title: `repository ${Date.now()}`,
          url: 'http://google.com.br',
          techs: ['php', 'js', 'css']
      });
      setRepository([...repositories, response.data]);
    } catch (e) {
      console.error(e)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepository(repositories.filter(repository => repository.id !== id));
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
