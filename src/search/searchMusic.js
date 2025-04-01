import { useState } from "react";
import { searchTrack } from "./spotifyService";
import "./styles.css"; // Importa o CSS

const MusicCard = ({ track }) => (
  <div className="music-card">
    <img src={track.album.images[0].url} alt={track.name} />
    <h2>{track.name}</h2>
    <p>{track.artists.map(artist => artist.name).join(", ")}</p>
    <audio controls>
      <source src={track.preview_url} type="audio/mpeg" />
      Seu navegador não suporta áudio.
    </audio>
  </div>
);

const SearchMusic = () => {
  const [track, setTrack] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const result = await searchTrack(query);
    setTrack(result);
  };

  return (
    <div className="search-container">
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

export default SearchMusic;
