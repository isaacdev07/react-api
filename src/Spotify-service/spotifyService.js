import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

// Definição das credenciais necessárias para autenticação na API do Spotify
const CLIENT_ID = "b25c838dbf074b168f0b16c97c863a8c"; // O ID do cliente fornecido pelo Spotify
const CLIENT_SECRET = "3d8c2cb34b944eab9615c0f4da03a8f8"; // O segredo do cliente fornecido pelo Spotify

// URLs necessárias para autenticação e para fazer chamadas à API
const TOKEN_URL = "https://accounts.spotify.com/api/token"; // URL para obter o token de acesso
const API_URL = "https://api.spotify.com/v1"; // URL base da API do Spotify

// Variável global para armazenar o token de acesso
let accessToken = "";

// Função assíncrona para obter o token de acesso da API do Spotify
const getAccessToken = async () => {
  // Envia uma requisição POST para obter o token de acesso
  const response = await axios.post(
    TOKEN_URL, // A URL para obter o token de acesso
    new URLSearchParams({ grant_type: "client_credentials" }), // Parâmetros da requisição (tipo de autenticação)
    {
      headers: {
        // Cabeçalho de autorização com o client_id e client_secret codificados em base64
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        // Cabeçalho indicando que o conteúdo enviado está no formato 'x-www-form-urlencoded'
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Armazena o token de acesso na variável global 'accessToken' para uso posterior
  accessToken = response.data.access_token;
};

// Função assíncrona para buscar informações sobre uma música no Spotify
const searchTrack = async (query) => {
  // Se o token de acesso ainda não foi obtido, chama a função getAccessToken
  if (!accessToken) await getAccessToken();

  // Envia uma requisição GET para a API de busca do Spotify com o token de acesso
  const response = await axios.get(`${API_URL}/search`, {
    headers: {
      // Inclui o token de acesso no cabeçalho de autorização para autenticação na requisição
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      // Parâmetros da requisição: a consulta de busca (query), o tipo de item (track), e o limite de resultados (1)
      q: query, 
      type: "track", 
      limit: 1,
    },
  });

  // Retorna o primeiro item encontrado na busca (primeira música que corresponde à consulta)
  return response.data.tracks.items[0];
};

// Exporta a função 'searchTrack' para ser utilizada em outros arquivos
export { searchTrack };
