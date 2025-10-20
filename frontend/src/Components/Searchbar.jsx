import { useEffect, useState } from "react"
import { FiltersModal } from "./FiltersModal.jsx";
import { useForm } from "../Hooks/useForm.jsx";
import { useFetch } from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./styles/Searchbar.css"


export const Searchbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData, handleChange] = useForm((name, value, newData) => {
    
    if (name === "materia" ){
      setFormData({ ...newData, [name + 'Id']: value.value, [name]: value.option })      
    } else if (name === "carrera"){
      value = JSON.parse(value);
      setFormData({ ...newData, [name + 'Id']: value.value, [name]: value.option })
    } else if (name === "includeCarrera"){
      setFormData({ ...newData, [name]: !formData.includeCarrera })
    }
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const carrerasUrl = formData.materiaId
      ? `carreras/?materia=${formData.materiaId}`
      : 'carreras/';
  
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchedMaterias = useFetch(`${API_URL}/materias/`);
  const fetchedCarreras = useFetch(`${API_URL}/${carrerasUrl}`);

  //seteo el formData con los query params que vengan en la url
  useEffect(() => {
    const defaultForm = {
      query: "",
      materia: "",
      materiaId: null,
      carrera: "",
      carreraId: null,
      tipo: "",
      includeCarrera: false,
      parcial: null,
      anio: null,
      comision: ""
    }
    searchParams.forEach((value, key) => {
      defaultForm[key] = key.includes("Id") || key.includes("anio") ? parseInt(value) : value;
    });
    setFormData(defaultForm);
  }, []);
  //cuando haya una materia seleccionada perteneciente a una única carrera setearla
  useEffect(() => {
    if (formData.includeCarrera){
      if (fetchedCarreras.data.length === 1){
        const carrera = fetchedCarreras.data[0];
        setFormData({
          ...formData,
          carrera: carrera.nombre,
          carreraId: carrera.id
        });
      }
    } 
  }, [formData.includeCarrera, formData.materiaId]);
  const handleClear = () => {
    const { query, ...rest } = formData;
    setFormData({ query: "", ...rest });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    let filtros = formData;
    //materia y carrera no se envian (sino materiaId y carreraId) 
    filtros.materia = "";
    filtros.carrera = "";
    if (!formData.includeCarrera) filtros.carreraId=null
    filtros.includeCarrera = null
    Object.entries(filtros).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    navigate(`/search/?${params.toString()}`);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="searchbar mx-auto ">
        <form className="searchbar-container" onSubmit={handleSubmit}>
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
          </button>

          <input className="search-input" type="text" placeholder="Buscar apuntes, modelos de parcial y más..." onChange={handleChange} name="query" value={formData.query} />

          {/*Esto hace que solo aparezca la cruz para borrar cuando hay algo escrito*/}
          {formData?.query && (
            <button className="clear-button" onClick={handleClear}>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" /></svg>
            </button>
          )}
        </form>

        <button className="filter-button" onClick={() => setShowModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" /></svg>
        </button>
      </div>

      <FiltersModal show={showModal}
        onHide={() => setShowModal(false)}
        useForm={[formData, setFormData, handleChange, handleSubmit]}
        fetchedData={{ fetchedMaterias, fetchedCarreras }} />

    </>
  )
} 