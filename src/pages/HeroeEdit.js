import React, {useState,useEffect} from 'react';
import HeroeForm from '../components/Heroe/HeroeForm';
import HeroePreview from '../components/Heroe/HeroePreview';
import LoaderPage from '../components/Loader/LoaderPage';
import api from '../utils/api';
import {useParams,navigate} from "@reach/router";
 
export default function HeroeEdit() {

  const params = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [heroeId, setHeroeId] = useState(params.heroeId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    Company: '',
    Name: '',
    Movie: '',
    PhotoUrl: '',
  });
  const [validationMessages, setValidationMessages] = useState({
    Company: undefined,
    Name: undefined,
    Movie: undefined,
    PhotoUrl: undefined,
  });

  useEffect(() => {
    getDataHeroes();
  }, [])

  const getDataHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const dataHeroe = await api.heroes.getHeroe(heroeId);
      setForm(dataHeroe);
      setLoading(false);      
      console.log(form);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
      },
    );
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleEditHeroe = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.heroes.updateHeroe(heroeId, form);
      setLoading(false);
      setModalIsOpen(true);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleValidateForm = () => {
    let flagExecution = true;
    let messageCompany = undefined;
    let messageName = undefined;
    let messageMovie = undefined;
    let messagePhotoUrl = undefined;

    if (form.Company === '') {
      messageCompany = 'Este campo es obligatorio';
      flagExecution = false;
    }
    if (form.Name === '') {
      messageName = 'Este campo es obligatorio';
      flagExecution = false;
    }
    if (form.Movie === '') {
      messageMovie = 'Este campo es obligatorio';
      flagExecution = false;
    }
    if (form.PhotoUrl === '') {
      messagePhotoUrl = 'Este campo es obligatorio';
      flagExecution = false;
    }

    if (flagExecution) {
      handleEditHeroe();
    } else {
      setValidationMessages({
          Company: messageCompany,
          Name: messageName,
          Movie: messageMovie,
          PhotoUrl: messagePhotoUrl,
        },
      );
    }
  };

  const onCloseModal = () => {
    navigate("/");
  };

  const onRedirectToHeroes = () => {
    navigate("/");
  };

  if (loading) {
    return <LoaderPage />;
  }
  return (
    <div className="container">
      <div className="row">
        <HeroeForm
          onChangeInput={handleChange}
          onSave={handleValidateForm}
          formValues={form}
          onBack={handleGoBack}
          errorForm={error}
          validationMessage={validationMessages}
          modalIsOpen={modalIsOpen}
          onCloseModal={onCloseModal}
          onRedirectToHeroes={onRedirectToHeroes}
        />
        <HeroePreview
          company={form.Company || 'COMPANY NAME'}
          name={form.Name || 'HEROE NAME'}
          movie={form.Movie || 'MOVIE NAME'}
          photoUrl={
            form.PhotoUrl ||
            'https://i.pinimg.com/originals/b5/34/df/b534df05c4b06ebd32159b2f9325d83f.jpg'
          }
        />
      </div>
    </div>
  );

}