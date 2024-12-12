import axios from 'axios';
import md5 from 'md5';

const API_URL = 'https://gateway.marvel.com/v1/public/comics';
const API_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const generateHash = (timeStamp: number): string => {
  return md5(timeStamp + PRIVATE_KEY + API_KEY);
};

export const fetchMarvelComics = async (page: number) => {
  try {
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);
    const offset = (page - 1) * 15;

    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        ts: timeStamp,
        hash: hash,
        limit: 15,
        offset: offset,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching Marvel comics:', error);
    return [];
  }
};

export const fetchMarvelComicById = async (id: number) => {
  try {
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const response = await axios.get(`${API_URL}/${id}`, {
      params: {
        apikey: API_KEY,
        ts: timeStamp,
        hash: hash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching Marvel comic:', error);
    return null;
  }
};