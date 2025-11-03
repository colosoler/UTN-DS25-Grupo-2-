import React, { useState } from 'react';
import { MaterialCreateForm } from '../Components/MaterialCreateForm.jsx';
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
    archivo: null,
    materiaId: '',
    carreraId: '',
    materia: '',
    carrera: '',
    comision: '',
    parcial: '',
    anioCursada: '',
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Fetch de materias
  const { data: materias, loading: mLoading } = useFetch(`${API_URL}/materias`);

  // Fetch de carreras según materia seleccionada
  const carrerasUrl = formData.materiaId
    ? `${API_URL}/carreras?materia=${formData.materiaId}`
    : `${API_URL}/carreras`;
  const { data: carreras, loading: cLoading } = useFetch(carrerasUrl);

  // Maneja el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleChange({ target: { name: 'archivo', value: file } });
  };

  // Subida del archivo a Cloudinary (endpoint separado)
  const uploadFile = async (file) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const formDataFile = new FormData();
    formDataFile.append('archivo', file);

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
    // Ajustar según tu controller: la URL debería venir en data.url o data.data.url
    return data.url || data.data?.archivo;
  };

  // Función para enviar formulario completo
  const handleSubmit = async (data) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    let archivoUrl = data.archivo;

    // Si hay un archivo File, lo subimos primero
    if (data.archivo instanceof File) {
      archivoUrl = await uploadFile(data.archivo);
    }

    const payload = {
      ...data,
      archivo: archivoUrl,
      userId: Number(user.id),
      materiaId: Number(data.materiaId),
      carreraId: Number(data.carreraId),
      añoCursada: Number(data.añoCursada),
      numeroParcial: data.numeroParcial ? Number(data.numeroParcial) : undefined,
      tipo: data.tipo.toUpperCase(), // Asegura que coincida con el enum TipoMaterial
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
    <MaterialCreateForm
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      materias={materias}
      carreras={carreras}
      onSubmit={async (data) => {
        try {
          await handleSubmit(data);
          setAlert({ show: true, message: 'Material subido correctamente', variant: 'success' });
          setFormData({});
          navigate('/')
        } catch (err) {
          console.log('Error onSubmit: ', err);
          setAlert({ show: true, message: err.message, variant: 'danger' });
        }
      }}
      alert={alert}
      setAlert={setAlert}
      cLoading={cLoading}
      userId={user.id}
      handleFileChange={handleFileChange}
    />
  );
};
