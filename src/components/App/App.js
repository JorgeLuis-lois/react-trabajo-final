import React from 'react';
import { Router } from '@reach/router';
import HeroeDetail from '../../pages/HeroeDetail';
import HeroeEdit from '../../pages/HeroeEdit';
import HeroeNew from '../../pages/HeroeNew';
import Heroes from '../../pages/Heroes';
import NotFound from '../../pages/NotFound';
import Layout from '../Layout/Layout';

function App() {
  return (
        <Layout>
          <Router>
            <Heroes path="/"></Heroes>
            <HeroeNew path="/heroe/new"></HeroeNew>          
            <HeroeEdit path="/heroe/:heroeId/edit"></HeroeEdit>
            <HeroeDetail path="/heroe/:heroeId/detail"></HeroeDetail>
            <NotFound path="/notFound"></NotFound>
          </Router>
        </Layout>
  );
}

export default App;
