import React, { Component,useState,useEffect } from 'react';
import HeroeDetailHtml from '../components/Heroe/HeroeDetailHtml';
import LoaderPage from '../components/Loader/LoaderPage';
import api from '../utils/api';
import {useParams,navigate} from "@reach/router";

export default function HeroeDetail() {

  const params = useParams();
  const [heroeId, setHeroeId] = useState(params.heroeId);
  const [loading, setLoading] = useState(true);
  const [heroe, setHeroe] = useState({
    Company: '',
    Name: '',
    Movie: '',
    PhotoUrl: '',
    id:''
  });
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getDataHeroe();
  }, [])

  const getDataHeroe = async () => {
    try {
      setLoading(true);
      setError(null);
      const dataHeroe = await api.heroes.getHeroe(heroeId);
      setLoading(false);
      setHeroe(dataHeroe);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const onOpenModal = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const deleteHeroe = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.heroes.removeHeroe(heroeId);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return <LoaderPage />;
  }
  return (
    <HeroeDetailHtml
      heroe={heroe}
      modalIsOpen={modalIsOpen}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onDeleteHeroe={deleteHeroe}
    />
  );

}