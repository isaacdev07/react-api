import { useState } from "react"; // Importa o hook useState para gerenciar o estado dos componentes
import { searchTrack } from "./spotifyService"; // Importa a função 'searchTrack' que faz a busca das músicas no serviço do Spotify
import "./styles.css"; // Importa o arquivo de estilo CSS para estilizar o componente

// Componente MusicCard - Responsável por exibir as informações da música
const MusicCard = ({ track }) => (
  <div className="music-card">
    {" "}
    {/* Div que envolve as informações da música */}
    {/* Exibe a imagem do álbum, com a URL fornecida pela API do Spotify */}
    <img src={track.album.images[0].url} alt={track.name} />
    {/* Exibe o nome da música */}
    <h2>{track.name}</h2>
    {/* Exibe os nomes dos artistas. 'track.artists' é um array, então usamos map() para criar uma string com todos os artistas */}
    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
    {/* Exibe o nome do álbum */}
    <h2>{track.album.name}</h2>
  </div>
);

// Componente SearchMusic - Responsável pela pesquisa da música
const SearchMusic = () => {
  const [track, setTrack] = useState(null); // 'track' armazenará a música retornada após a busca
  const [query, setQuery] = useState(""); // 'query' armazenará o texto digitado pelo usuário na pesquisa

  // Função chamada ao clicar no botão "Buscar". Ela faz a busca da música utilizando a função 'searchTrack'
  const handleSearch = async () => {
    const result = await searchTrack(query); // Chama a função searchTrack com a consulta fornecida
    setTrack(result); // Atualiza o estado 'track' com o resultado da busca
  };

  return (
    <div className="search-container">
      {" "}
      {/* Container para o campo de busca e resultados */}
      {/* Campo de input onde o usuário digita o nome da música. O valor é controlado pelo estado 'query' */}
      <input
        type="text"
        placeholder="Digite o nome da música..." // Texto de sugestão no campo de entrada
        value={query} // O valor do campo é vinculado ao estado 'query'
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado 'query' sempre que o usuário digitar algo
      />
      {/* Botão que chama a função 'handleSearch' ao ser clicado */}
      <button onClick={handleSearch}>Buscar</button>
      {/* Se o estado 'track' não for nulo, renderiza o componente MusicCard com os dados da música */}
      {track && <MusicCard track={track} />}
    </div>
  );
};

export default SearchMusic; // Exporta o componente SearchMusic para ser usado em outro lugar
