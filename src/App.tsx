import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { GenreProvider } from './contexts/genre';
import { Header } from './components/Header';
import { Content } from './components/Content';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenreProvider>
      <SideBar />

        <div className="container">
          <Header />
          <Content />
        </div>
      </GenreProvider>
    </div>
  )
}