import React, { useEffect, useState } from 'react';
import { fetchMarvelCharacters } from './api/marvel';

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      const characters = await fetchMarvelCharacters();
      setCharacters(characters);
      setLoading(false);
    };
    getCharacters();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {characters.map((character) => (
        <div key={character.id} className="p-4 border rounded-lg">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="w-full h-48 object-cover"
          />
          <h2 className="mt-2 text-xl font-bold">{character.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;