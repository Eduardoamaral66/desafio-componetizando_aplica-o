import React, { createContext, useState, useCallback, useContext, useEffect, useMemo } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface GenreContextData {
  selectedGenreId: number;
  updateSelectedGenre(newGenreId: number): void;
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps | undefined;
}

const GenreContext = createContext<GenreContextData>(
  {} as GenreContextData,
);

export const GenreProvider: React.FC = ({ children }) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      if(response.data && response.data.length > 0){
        setSelectedGenreId(response.data[0].id)
      }
    });
  },[]);

  const updateSelectedGenre = useCallback((newGenreId: number)=>{
    setSelectedGenreId(newGenreId);
  }, []);

  const selectedGenre = useMemo(()=>{
    const result = genres.find((gr)=> gr.id === selectedGenreId);
    return result;
  },[selectedGenreId, genres]);

  return (
    <GenreContext.Provider value={{ selectedGenreId, updateSelectedGenre, genres, selectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export function useGenre(): GenreContextData {
  const context = useContext(GenreContext);
  return context;
}