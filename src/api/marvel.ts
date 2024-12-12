import axios from 'axios';
import md5 from 'md5'

const API_URL = 'https://gateway.marvel.com/v1/public/';
const API_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const generateHash = (timeStamp: number): string => {
  return md5(timeStamp + PRIVATE_KEY + API_KEY);
};

const fetchMarvelData = async (endpoint: string) => {
  try {
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const response = await axios.get(API_URL + endpoint, {
      params: {
        apikey: API_KEY,
        ts: timeStamp,
        hash: hash,
        limit: 10,
        offset: Math.floor(Math.random() * 1000),
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error(`Error fetching Marvel ${endpoint}:`, error);
    return [];
  }
};

export const fetchMarvelCharacters = () => fetchMarvelData('characters');
export const fetchMarvelComics = () => fetchMarvelData('comics');
