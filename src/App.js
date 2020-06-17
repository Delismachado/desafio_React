import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  // listar repositorios da API
   useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });

    }, []);
  


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `3º desafio GoStack, React ${Date.now()}`,
      url: "https://github.com/Delismachado",
      techs: ["Python", "JavaScript"]
    });

    const repository = response.data;


    setRepositories([...repositories, repository]);
  }



  async function handleRemoveRepository(id) {
    // remover repo
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const refreshed = repositories.filter(repository => repository.id !== id);
      setRepositories([...refreshed]);
    }
  }

  return (
    <>
     <h1>Desafio React - GoStack</h1>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
