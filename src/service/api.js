import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchMovies = async (query, page = 1, genre = "") => {
  const response = await instance.get("/movies", {
    params: {
      search: query,
      page,
      genre,
    },
  });
  return response.data;
};

export const fetchAuthToken = async () => {
  const response = await instance.get("/auth/token");
  return response.data;
};
export const fetchMovieGenres = async () => {
  const response = await instance.get("/genres/movies");
  return response.data;
};
