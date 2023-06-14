import React from 'react';
import MainLayout from '../layouts/Main';
import MusicResults from '../components/SearchResults/MusicResults';
import MusicSearch from '../components/Forms/MusicSearch';

const Music = () => {
  return (
    <MainLayout>
      <MusicSearch />
      <MusicResults />
    </MainLayout>
  )
};

export default Music;