import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      setPokemon(response.data.results);
      setFilteredPokemon(response.data.results);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredPokemon(pokemon.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [searchTerm, pokemon]);

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        className='input'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((poke) => (
          <div className="pokemon-card" key={poke.name}>
            <h2>{poke.name}</h2>
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/${poke.name}.png`}
              alt={poke.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
