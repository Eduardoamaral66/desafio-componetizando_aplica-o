import { useEffect, useState } from 'react';
import { useGenre } from '../contexts/genre';
import { api } from '../services/api';
import { Button } from './Button';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar() {
  const { genres, selectedGenreId, updateSelectedGenre } = useGenre();

  function handleClickButton(id: number) {
    updateSelectedGenre(id);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={genre.id}
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
    </nav>
  )
}