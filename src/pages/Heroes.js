import React, {useState,useEffect,useReducer} from 'react';
import HeroeList from '../components/Heroe/HeroeList';
import MessageWarning from '../components/Messages/MessageWarning';
import ButtonNewHero from '../components/Button/ButtonNewHero';
import LoaderHeroes from '../components/Loader/LoaderHeroes';
import api from '../utils/api';

export default function Heroes () {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroes, setHeroes] = useState(undefined);

    useEffect( async()=>{
      setLoading(true);
      setError(null);
      try {
        const dataHeroes = await api.heroes.listHeroes();
        setLoading(false);
        setHeroes(dataHeroes);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    },[]);

 

    if (loading) {
      return (
        <React.Fragment>
          <ButtonNewHero />
          <br />
          <LoaderHeroes />
        </React.Fragment>
      );
    }

    if (error) {
      return <MessageWarning message={this.state.error.message} />;
    }

    if (!heroes || heroes.length === 0) {
      return (
        <div>
          <ButtonNewHero />
          <br />
          <MessageWarning message="No existe información." />;
        </div>
      );
    }

    return (
      <div>
        <ButtonNewHero />
        <br />
        <HeroeList heroes={heroes} />
      </div>
    );

};