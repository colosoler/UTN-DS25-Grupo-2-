import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomeApp } from './Apps/HomeApp'
import { CarreraDetailApp } from './Apps/CarreraDetailApp'
import { SearchResultApp} from './Apps/SearchResultApp'
import MaterialRouteWrapper from './Apps/MaterialRouteWrapper'
import { Navbar } from './Components/Navbar'
import { Login } from './Apps/Login'
import { Signup } from './Apps/Signup'
import { CreateMaterialApp } from './Apps/CreateMaterialApp.jsx'
import { ProfilePage } from './Apps/ProfilePage.jsx'
import { SettingsPage } from './Apps/SettingsPage.jsx'
import { MyPosts } from './Apps/MyPosts.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const results = [
  {
    id: "1",
    title: "Apuntes de Matemáticas - Cálculo Diferencial",
    description: "Resumen completo de los conceptos básicos de cálculo diferencial con ejemplos prácticos.",
    user: "usuario1",
    upvotes: 20,
    downvotes: 5,
  },
  {
    id: "2",
    title: "Video Tutorial - Programación en Python",
    description: "Tutorial paso a paso para aprender los fundamentos de Python desde cero.",
    user: "usuario1",
    upvotes: 10,
    downvotes: 1,
  },
  {
    id: "3",
    title: "Resumen de Historia Universal",
    description: "Cronología detallada de eventos históricos importantes del siglo XX.",
    user: "usuario1",
    upvotes: 15,
    downvotes: 3,
  },
]

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/' || location.pathname === '/signup';
  return (
    <>

      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/result" element={<SearchResultApp/>} />
          <Route path="/home" element={<HomeApp/>} />
          <Route path="/carrera/:id" element={<CarreraDetailApp/>} />
          <Route path="/search" element={<SearchResultApp results={results}/>} />
          <Route path="/material/:id" element={<MaterialRouteWrapper results={results}/>} />
          <Route path="/add" element={<CreateMaterialApp/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/myposts" element={<MyPosts results={results}/>} />
        </Routes>   
      </main>
    </>
  )
}

export default App
