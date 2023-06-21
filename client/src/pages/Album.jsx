import React from 'react';
import MainLayout from '../layouts/Main';
import { useParams } from 'react-router-dom';

import AlbumProfile from '../components/Profile/AlbumProfile';

const Album = () => {
  const { albumId } = useParams();

  return (
    <MainLayout>
      <AlbumProfile />
    </MainLayout>
  )
};

export default Album;