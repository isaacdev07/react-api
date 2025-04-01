import axios from "axios";

const CLIENT_ID = "b25c838dbf074b168f0b16c97c863a8c";
const CLIENT_SECRET = "3d8c2cb34b944eab9615c0f4da03a8f8";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

let accessToken = "";

const getAccessToken = async () => {
  const response = await axios.post(
    TOKEN_URL,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  accessToken = response.data.access_token;
};

const searchTrack = async (query) => {
  if (!accessToken) await getAccessToken();
  
  const response = await axios.get(`${API_URL}/search`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { q: query, type: "track", limit: 1 },
  });

  return response.data.tracks.items[0];
};

export { searchTrack };
