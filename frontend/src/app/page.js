'use client';
import { useState } from 'react';
import styles from './styles/Home.module.css';

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
  };

  const fetchPokemon = () => {
    if (!name) return;

    setLoading(true);
    setError('');
    setPokemon(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}?name=${name}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Pokémon não encontrado');
          });
        }
        return res.json();
      })
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>PokéAPI com Next.js e Spring Boot</h1>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchPokemon} className={styles.button}>Buscar</button>
      </div>

      {loading && <p className={styles.loading}>Buscando Pokémon...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {pokemon && (
        <div className={styles.card}>
          <h2 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h2>
          {pokemon.sprites?.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.pokemonImage}/>
          )}

          <div>
            <strong>Tipo:</strong>{' '}
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                className={styles.typeBadge}
                style={{ backgroundColor: typeColors[t.type.name] || '#A8A878' }}
              >
                {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            <div>
              <strong>Altura:</strong>
              <p>{pokemon.height / 10} m</p>
            </div>
            <div>
              <strong>Peso:</strong>
              <p>{pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className={styles.statsContainer}>
            <h3 className={styles.statsTitle}>Stats</h3>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} style={{ marginBottom: '4px' }}>
                <strong>{stat.stat.name.toUpperCase()}</strong>
                <div className={styles.statBarBackground}>
                  <div className={styles.statBarFill} style={{ width: `${stat.base_stat}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}