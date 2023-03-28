import React, { useState, useEffect } from "react";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_SIZE = 20;

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // Fetches Pokemon data from the API
  const fetchPokemonData = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${POKEMON_API_URL}?offset=${(page - 1) * PAGE_SIZE}&limit=${PAGE_SIZE}`);
      const data = await response.json();
      setPokemonData((prevData) => [...prevData, ...data.results]);
    } catch (err) {
      setError("Failed to fetch Pokemon data.");
    }

    setLoading(false);
  };

  // Load more Pokemon data when user scrolls to bottom of the page
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Pokemon data on mount and when currentPage changes
  useEffect(() => {
    setPokemonData([]);
    fetchPokemonData(currentPage);
  }, [currentPage]);

  // Filter Pokemon data based on search text
  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>
        {filteredPokemonData.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
