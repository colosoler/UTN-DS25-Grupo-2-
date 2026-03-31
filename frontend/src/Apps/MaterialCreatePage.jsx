import React, { useState } from 'react';
import { MaterialCreateForm } from '../Components/MaterialCreateForm.jsx';
import { Loading } from '../Components/Loading.jsx';
import { useForm } from '../Hooks/useForm.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { getToken } from '../Helpers/auth.js';
import { useAuth } from '../Contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export const MaterialCreatePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Hook para manejar los datos del formulario
  const [formData, setFormData, handleChange] = useForm({
    titulo: '',
    descripcion: '',
    tipo: '',
    archivos: null,
    materiaId: '',
    carreraId: '',
    materia: '',
    carrera: '',
    comision: '',
    parcial: '',
    añoCursada: '',
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch de materias
  const { data: materias, loading: mLoading } = useFetch(`${API_URL}/materias`);

  // Fetch de carreras según materia seleccionada
  const carrerasUrl = formData.materiaId
    ? `${API_URL}/carreras?materia=${formData.materiaId}`
    : `${API_URL}/carreras`;
  const { data: carreras, loading: cLoading } = useFetch(carrerasUrl);

  //construir URL para obtener la relación carrera/materia
  const CarreraMateriaURL = formData.materiaId && formData.carreraId
    ? `carreras/${formData.carreraId}/materias/${formData.materiaId}`
    : false;
  const { data: carreraMateria, loading: cmLoading } = useFetch(
    CarreraMateriaURL ? `${API_URL}/${CarreraMateriaURL}` : '', //si no hay url pasa '' para evitar fetch
    {},
    { requireAuth: false },
    { enabled: Boolean(CarreraMateriaURL) }
  );

  /* Maneja el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleChange({ target: { name: 'archivo', value: file } });
  };*/

  // Subida del archivo a Cloudinary (endpoint separado)
  const uploadFile = async (files) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const formDataFile = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formDataFile.append('archivo', file); //todos se llaman archivo para recibirlo así en el back
    }
    const res = await fetch(`${API_URL}/materials/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataFile,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'No se pudo leer el error del backend' }));
      throw new Error(errorData?.error || 'Error subiendo archivo');
    }

    const data = await res.json();
    return data.url
  };

  // Función para enviar formulario completo
  const handleSubmit = async (data) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');
    let archivoUrl = '';
    try {
      if (data.archivos?.length > 0) {
        archivoUrl = await uploadFile(data.archivos);
      }
    } catch (err) {
      console.log('Error en handleSubmit al subir archivo: ', err);
      throw new Error('Error subiendo el archivo: ' + err.message);
    }

    const payload = {
      ...data,
      archivo: archivoUrl,
      userId: Number(user.id),
      materiaId: Number(data.materiaId),
      carreraId: Number(data.carreraId),
      añoCursada: Number(data.añoCursada),
      numeroParcial: data.numeroParcial ? Number(data.numeroParcial) : undefined,
      tipo: data.tipo,
    };

    console.log('Datos enviados al backend:', payload);

    const res = await fetch(`${API_URL}/materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'No se pudo leer el error del backend' }));
      throw new Error(errorData?.message || 'Error creando material');
    }

    return res.json();
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <MaterialCreateForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          materias={materias}
          carreras={carreras}
          onSubmit={async (data) => {
            try {
              setIsLoading(true);
              await handleSubmit(data);
              setFormData({});
              // Redirige sin esperar, el mensaje aparecerá en MyMaterialsPage
              navigate('/mymaterials', { state: { successMessage: 'Material subido correctamente' } });
            } catch (err) {
              console.log('Error onSubmit: ', err);
              setAlert({ show: true, message: err.message, variant: 'danger' });
            } finally {
              setIsLoading(false);
            }
          }}
          alert={alert}
          setAlert={setAlert}
          cLoading={cLoading}
          userId={user.id}
          //handleFileChange={handleFileChange}
          carreraMateria={carreraMateria}
          cmLoading={cmLoading}
        />
      )}
    </>
  );
};
