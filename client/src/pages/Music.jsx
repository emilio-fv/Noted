// Imports
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MusicResults from '../components/SearchResults/MusicResults';
import MusicSearch from '../components/Forms/MusicSearch';

const Music = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <MusicSearch setSearchQuery={setSearchQuery}/>
      <MusicResults searchQuery={searchQuery}/>
    </Layout>
  )
};

export default Music;