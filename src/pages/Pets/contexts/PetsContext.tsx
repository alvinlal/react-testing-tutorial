import React, { useState, useEffect } from 'react';

const PetsContext = React.createContext<{
  cats: Cat[];
  setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
  updateFavoured: (index: number, favoured: boolean) => void;
  status: string;
}>({ cats: [], setCats: () => {}, updateFavoured: () => {}, status: 'idle' });

const PetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [status, setStatus] = useState('idle');

  const updateFavoured = (index: number, favoured: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    setCats(updatedCats);
  };

  const fetchCats = async () => {
    try {
      setStatus('loading');
      const data = await fetch('https://631c5fa04fa7d3264caca918.mockapi.io/api/cats').then(res => {
        if (!res.ok) {
          throw new Error('something went wrong');
        }
        return res.json();
      });
      if (!data.error) {
        setCats(data);
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <PetsContext.Provider value={{ cats, setCats, updateFavoured, status }}>
      {children}
    </PetsContext.Provider>
  );
};

export { PetsContext, PetsProvider };
