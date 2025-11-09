import React, { useState, useEffect } from 'react';
import { MaterialCreateForm } from '../Components/MaterialCreateForm.jsx';
import { useForm } from '../Hooks/useForm.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { getToken } from '../Helpers/auth.js';
import { useAuth } from '../Contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Components/Loading.jsx';

export const MaterialEditPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

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

  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [loading, setLoading] = useState(true);

  // Fetch de materias
  const { data: materias } = useFetch(`${API_URL}/materias`);

  // Fetch de carreras según materia seleccionada
  const carrerasUrl = formData.materiaId
    ? `${API_URL}/carreras?materia=${formData.materiaId}`
    : `${API_URL}/carreras`;
  const { data: carreras, loading: cLoading } = useFetch(carrerasUrl);

  // URL para obtener la relación carrera/materia
  const CarreraMateriaURL = formData.materiaId && formData.carreraId
    ? `carreras/${formData.carreraId}/materias/${formData.materiaId}`
    : false;
  const { data: carreraMateria, loading: cmLoading } = useFetch(
    CarreraMateriaURL ? `${API_URL}/${CarreraMateriaURL}` : '',
    {},
    { requireAuth: false },
    { enabled: Boolean(CarreraMateriaURL) }
  );

  // Cargar el material al inicio (espera a que las materias estén cargadas)
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        const token = getToken();
        if (!token) throw new Error('No se encontró token de autenticación');

        const res = await fetch(`${API_URL}/materials/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Error al cargar el material');

        const response = await res.json();
        const material = response.data || response;

        // Buscar nombre de materia desde las materias cargadas
        let materiaNombre = '';
        if (materias?.materias && material.materiaId) {
          const materia = materias.materias.find(m => m.id === material.materiaId);
          materiaNombre = materia?.nombre || '';
        }

        setFormData({
          titulo: material.titulo || '',
          descripcion: material.descripcion || '',
          tipo: material.tipo || '',
          archivo: material.archivo || null,
          materiaId: String(material.materiaId) || '',
          carreraId: String(material.carreraId) || '',
          materia: materiaNombre,
          carrera: material.carreraNombre || '',
          comision: material.comision || '',
          parcial: material.numeroParcial !== null && material.numeroParcial !== undefined 
            ? String(material.numeroParcial) 
            : '',
          anioCursada: String(material.añoCursada) || '',
          añoCursada: String(material.añoCursada) || '',
        });
      } catch (err) {
        setAlert({ show: true, message: err.message, variant: 'danger' });
      } finally {
        setLoading(false);
      }
    };

    if (id && materias?.materias) {
      fetchMaterial();
    }
  }, [id, API_URL, materias]);

  // Actualizar nombre de materia cuando se carguen las materias
  useEffect(() => {
    if (materias?.materias && formData.materiaId) {
      const materia = materias.materias.find(m => m.id === Number(formData.materiaId));
      if (materia && materia.nombre !== formData.materia) {
        setFormData(prev => ({ ...prev, materia: materia.nombre }));
      }
    }
  }, [materias, formData.materiaId]);

  // Actualizar nombre de carrera cuando se carguen las carreras
  useEffect(() => {
    if (carreras?.carreras && formData.carreraId) {
      const carrera = carreras.carreras.find(c => c.id === Number(formData.carreraId));
      if (carrera && carrera.nombre !== formData.carrera) {
        setFormData(prev => ({ ...prev, carrera: carrera.nombre }));
      }
    }
  }, [carreras, formData.carreraId]);

  // Wrapper para sincronizar añoCursada
  const handleChangeWrapper = (e, callback, ...params) => {
    if (e?.target?.name === 'añoCursada') {
      const newValue = e.target.value;
      setFormData(prev => ({
        ...prev,
        añoCursada: newValue,
        anioCursada: newValue
      }));
      if (callback) callback(newValue, ...params);
      return;
    }
    handleChange(e, callback, ...params);
  };

  // Enviar formulario
  const handleSubmit = async (data) => {
    const token = getToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    // Obtener valores del data o del formData como fallback
    const titulo = (data.titulo || formData.titulo || '').trim();
    const descripcion = (data.descripcion || formData.descripcion || '').trim();
    const tipo = (data.tipo || formData.tipo || '').toUpperCase();
    // Asegurarse de que archivo sea una string válida
    const archivo = data.archivo || formData.archivo;
    const materiaId = Number(data.materiaId || formData.materiaId);
    const carreraId = Number(data.carreraId || formData.carreraId);
    const añoCursada = Number(data.anioCursada || formData.anioCursada || formData.añoCursada);
    const comision = (data.comision || formData.comision || '').trim();
    const parcialValue = Number(data.numeroParcial || data.parcial || formData.parcial || 0);

    // Validar que los campos requeridos tengan valores
    if (!titulo) throw new Error('El título es requerido');
    if (!descripcion) throw new Error('La descripción es requerida');
    if (!tipo) throw new Error('El tipo es requerido');
    
    // Validar archivo - debe ser una string no vacía
    let archivoUrl = '';
    if (typeof archivo === 'string' && archivo.length > 0) {
      archivoUrl = archivo;
    } else if (archivo) {
      archivoUrl = String(archivo);
    }
    
    if (!archivoUrl) {
      throw new Error('El archivo es requerido');
    }
    
    if (!materiaId || isNaN(materiaId)) throw new Error('La materia es requerida');
    if (!carreraId || isNaN(carreraId)) throw new Error('La carrera es requerida');
    if (!añoCursada || isNaN(añoCursada)) throw new Error('El año de cursada es requerido');
    if (!comision) throw new Error('La comisión es requerida');

    // Construir payload
    const payload = {
      titulo,
      descripcion,
      tipo,
      archivo: archivoUrl,
      materiaId,
      carreraId,
      añoCursada,
      comision,
    };
    
    // Solo enviar numeroParcial si es mayor que 0 (el schema requiere positivo si se envía)
    if (parcialValue > 0) {
      payload.numeroParcial = parcialValue;
    }

    console.log('Payload enviado:', payload);

    const res = await fetch(`${API_URL}/materials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Error del backend:', errorData);
      const errorMessage = errorData?.message || errorData?.error || 
        (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0 
          ? errorData.errors.map(e => e.message || e.msg).join(', ')
          : 'Error actualizando material');
      throw new Error(errorMessage);
    }

    return res.json();
  };

  // handleFileChange vacío para que no se pueda cambiar el archivo
  const handleFileChange = () => {};

  if (loading) {
    return <Loading />;
  }

  return (
    <MaterialCreateForm
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChangeWrapper}
      materias={materias}
      carreras={carreras}
      onSubmit={async (data) => {
        try {
          await handleSubmit(data);
          setAlert({ show: true, message: 'Material actualizado correctamente', variant: 'success' });
          setTimeout(() => navigate('/mymaterials'), 1500);
        } catch (err) {
          setAlert({ show: true, message: err.message, variant: 'danger' });
        }
      }}
      alert={alert}
      setAlert={setAlert}
      cLoading={cLoading}
      userId={user.id}
      handleFileChange={handleFileChange}
      carreraMateria={carreraMateria}
      cmLoading={cmLoading}
      hideFileUpload={true}
      buttonText="Actualizar"
    />
  );
};
