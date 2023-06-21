import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '../layouts/Main';
import ArtistProfile from '../components/Profile/ArtistProfile';

const Artist = () => {
  const { artistId } = useParams();

  // Fetch artist data
  // Fetch related reviews

  return (
    <MainLayout>
      <ArtistProfile />
    </MainLayout>
  )
};

export default Artist;