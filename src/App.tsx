import React from 'react';
import CharacterList from './CharacterList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marvel Characters</h1>
      <CharacterList />
    </div>
  );
};

export default App;