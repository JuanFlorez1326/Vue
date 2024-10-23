import axios, { type AxiosInstance } from 'axios';

const pokemonApi: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export { pokemonApi };
