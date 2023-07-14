// Imports
import React from 'react';
import Layout from '../components/Layout';
import MusicResults from '../components/SearchResults/MusicResults';
import MusicSearch from '../components/Forms/MusicSearch';

const Music = () => {
  return (
    <Layout>
      <MusicSearch />
      <MusicResults />
    </Layout>
  )
};

export default Music;