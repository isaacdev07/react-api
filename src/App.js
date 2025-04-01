import React, { useState } from "react";
import { searchTrack } from "../src/Spotify-service/spotifyService";

import "../src/css/style.css"; // Importa os estilos

const MusicCard = ({ track }) => (
  <div className="music-card">
    <img src={track.album.images[0].url} alt={track.name} />
    <h2>{track.name}</h2>
    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
    {track.preview_url ? (
      <audio controls>
        <source src={track.preview_url} type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>
    ) : (
      <p className="no-preview">Prévia indisponível</p>
    )}
  </div>
);

const App = () => {
  const [track, setTrack] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const result = await searchTrack(query);
    setTrack(result);
  };

  return (
    <div className="search-container">
      <h1>Spotify Senai</h1>
      <input
        type="text"
        placeholder="Digite o nome da música..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {track && <MusicCard track={track} />}
    </div>
  );
};

export default App;
