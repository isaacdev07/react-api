import { useState } from "react"; // Importa o hook useState do React para gerenciar os estados do componente
import { searchTrack } from "./spotifyService"; // Importa a função searchTrack que realiza a busca na API do Spotify
import '../css/style.css'; // Importa os estilos CSS para o componente

// Componente MusicCard - Responsável por exibir as informações da música
const MusicCard = ({ track }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md w-64"> {/* Container com borda, sombra e espaçamento */}
      
      {/* Exibe a imagem do álbum da música */}
      <img src={track.album.images[0].url} alt={track.name} className="w-full rounded-md" />
      
      {/* Exibe o nome da música */}
      <h2 className="text-lg font-semibold mt-2">{track.name}</h2>
      
      {/* Exibe os nomes dos artistas da música. Usamos map para pegar todos os nomes e join para separar por vírgula */}
      <p className="text-gray-600">{track.artists.map(artist => artist.name).join(", ")}</p>
      
      {/* Exibe o nome do álbum da música */}
      <p className="text-gray-600 mt-1">{track.album.name}</p> {/* Nome do álbum */}
      
      {/* Link para ouvir a música completa no Spotify */}
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
};

// Componente SearchMusic - Responsável pela interação de busca e renderização do resultado
const SearchMusic = () => {
  const [track, setTrack] = useState(null); // 'track' irá armazenar as informações da música retornada após a busca
  const [query, setQuery] = useState(""); // 'query' irá armazenar o texto digitado pelo usuário para pesquisa

  // Função chamada ao clicar no botão de busca. Realiza a busca da música usando a função searchTrack.
  const handleSearch = async () => {
    const result = await searchTrack(query); // Chama a função searchTrack com a consulta fornecida
    setTrack(result); // Atualiza o estado 'track' com o resultado da busca
  };

  return (
    <div className="flex flex-col items-center space-y-4"> {/* Container com layout flexível */}
      {/* Campo de input onde o usuário digita o nome da música. O valor é controlado pelo estado 'query' */}
      <input
        type="text"
        placeholder="Digite o nome da música..." // Texto de sugestão no campo de entrada
        value={query} // O valor do campo é controlado pelo estado 'query'
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado 'query' sempre que o usuário digitar algo
        className="border p-2 rounded-lg" // Aplica estilo ao input
      />

      {/* Botão que chama a função 'handleSearch' quando pressionado */}
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Buscar
      </button>

      {/* Se o estado 'track' não for nulo, renderiza o componente MusicCard com as informações da música */}
      {track && <MusicCard track={track} />}
    </div>
  );
};

export default SearchMusic; // Exporta o componente SearchMusic para ser usado em outro lugar
