import React, { useState } from 'react';
import { MaterialCreateForm } from '../Components/MaterialCreateForm.jsx';
import { useForm } from '../Hooks/useForm.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { getToken } from '../Helpers/auth.js';
import { useAuth } from '../Contexts/AuthContext.jsx';

export const MaterialCreatePage = () => {
  const { user } = useAuth();
  const [formData, setFormData, handleChange] = useForm((name, value, newData) => {
    if (name === 'materia' || name === 'carrera') {
      setFormData({ ...newData, [name + 'Id']: value.value, [name]: value.option });
    }
  });

  
  const API_URL = import.meta.env.VITE_API_URL;
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const { data: materias, loading: mLoading, error: mError } = useFetch(`${API_URL}/materias`);

  const carrerasUrl = formData.materiaId
    ? `${API_URL}/carreras?materia=${formData.materiaId}`
    : `${API_URL}/carreras`;
  const { data: carreras, loading: cLoading, error: cError } = useFetch(carrerasUrl);

  const handleSubmit = async (data) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');
    
    const res = await fetch(`${API_URL}/materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      let errorData
      try {
        errorData = await res.json();
      } catch (err) {
        errorData = { error: 'No se pudo leer el error del backend'};
      }
      console.log('Error del backend: ', errorData)
      throw new Error(errorData?.error || 'Error subiendo material');
    }
    
    return res.json();
  };

  return (
    <MaterialCreateForm
      formData={formData}
      handleChange={handleChange}
      materias={materias}
      carreras={carreras}
      onSubmit={async (data) => {
        try {
          await handleSubmit(data);
          setAlert({ show: true, message: 'Material subido correctamente', variant: 'success' });
          setFormData({});
        } catch (err) {
          console.log('Error onSubmit: ', err)
          setAlert({ show: true, message: err.message, variant: 'danger' });
        }
      }}
      alert={alert}
      setAlert={setAlert}
      cLoading={cLoading}
      userId={user.id}
    />
  );
};
