// Imports
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import axios from 'axios';

const Landing = () => {
  useEffect(() => {
    const data = axios.get('https://note-d-server.vercel.app/');
    console.log(data);

  }, [])

  return (
    <Layout>
      <Hero />
    </Layout>
  )
};

export default Landing;