import { useState } from "react";
import { searchTrack } from "./spotifyService";
import '../css/style.css'

const MusicCard = ({ track }) => {
  // Convertendo a duração da música para minutos e segundos (mm:ss)
  const duration = new Date(track.duration_ms).toISOString().substr(14, 5);

  return (
    <div className="p-4 border rounded-lg shadow-md w-64">
      <img src={track.album.images[0].url} alt={track.name} className="w-full rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{track.name}</h2>
      <p className="text-gray-600">{track.artists.map(artist => artist.name).join(", ")}</p>
      <p className="text-gray-600 mt-1">{track.album.name}</p> {/* Nome do álbum */}
      <p className="text-gray-600 mt-1">Duração: {duration}</p> {/* Duração da música */}
      
      {/* Verifica se o preview_url está disponível e exibe o player de áudio */}
      {track.preview_url ? (
        <audio controls className="mt-2 w-full">
          <source src={track.preview_url} type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>
      ) : (
        <p className="mt-2 text-gray-600">Prévia não disponível</p>
      )}
    </div>
  );
};

const SearchMusic = () => {
  const [track, setTrack] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const result = await searchTrack(query);
    setTrack(result);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Digite o nome da música..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-lg"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Buscar
      </button>
      {track && <MusicCard track={track} />}
    </div>
  );
};

export default SearchMusic;
