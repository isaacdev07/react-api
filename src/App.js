import React, { useState } from "react"; // Importa o React e a função useState para gerenciar o estado
import { searchTrack } from "../src/Spotify-service/spotifyService"; // Importa a função 'searchTrack' que irá buscar a música no serviço de Spotify

import "../src/css/style.css"; // Importa o arquivo CSS para estilizar os componentes

// Componente MusicCard - Responsável por exibir os detalhes da música
const MusicCard = ({ track }) => (
  <div className="music-card">
    {" "}
    {/* Div que envolve o card da música */}
    {/* Exibe a imagem do álbum, utilizando a URL fornecida pela API do Spotify */}
    <img src={track.album.images[0].url} alt={track.name} />
    {/* Exibe o nome da música */}
    <h2>{track.name}</h2>
    {/* Exibe os artistas da música. 'track.artists' é um array, então usamos map() para criar uma string com os nomes dos artistas */}
    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
    {/* Exibe o nome do álbum. Está dentro de uma tag <h2> para destacar, seguido por um parágrafo com o nome do álbum */}
    <h2>
      Álbum
      <p>{track.album.name}</p> {/* Nome do álbum */}
    </h2>
    {/* Aqui é exibido um link para a música completa no Spotify. 
        O link é obtido de 'track.external_urls.spotify', que contém a URL da música no Spotify */}
    <p className="no-preview">
      <a
        href={track.external_urls.spotify} // URL que leva à música completa no Spotify
        target="_blank" // Abre o link em uma nova aba
        rel="noopener noreferrer" // Segurança adicional ao abrir o link em uma nova aba
      >
        Ouça a música completa no Spotify
      </a>
    </p>
  </div>
);

// Componente principal App - Contém a interface de pesquisa e exibe os resultados
const App = () => {
  const [track, setTrack] = useState(null); // 'track' armazena a música encontrada após a busca
  const [query, setQuery] = useState(""); // 'query' armazena o texto digitado pelo usuário para buscar a música

  // Função assíncrona chamada ao clicar no botão "Buscar".
  // Ela chama a função 'searchTrack' que vai buscar a música no serviço Spotify e retornar o resultado.
  const handleSearch = async () => {
    if (query.trim() === "") return; // Se o campo de pesquisa estiver vazio, a função retorna e não faz a busca.
    const result = await searchTrack(query); // Chama a função searchTrack, passando a consulta (query)
    setTrack(result); // Atualiza o estado 'track' com o resultado da busca
  };

  return (
    <div className="search-container">
      {" "}
      {/* Container que envolve o formulário de busca e a exibição do resultado */}
      <h1>Spotify Senai</h1> {/* Título da aplicação */}
      {/* Campo de input para digitar o nome da música. O valor é controlado pelo estado 'query' */}
      <input
        type="text"
        placeholder="Digite o nome da música..." // Texto que aparece no campo de input
        value={query} // O valor do input é o estado 'query'
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado 'query' sempre que o valor do input mudar
      />
      {/* Botão de busca, quando clicado chama a função handleSearch */}
      <button onClick={handleSearch}>Buscar</button>
      {/* Se 'track' não for nulo (ou seja, se a busca encontrar uma música), renderiza o componente MusicCard */}
      {track && <MusicCard track={track} />}
    </div>
  );
};

export default App; // Exporta o componente App para ser utilizado em outro lugar (geralmente no index.js)
