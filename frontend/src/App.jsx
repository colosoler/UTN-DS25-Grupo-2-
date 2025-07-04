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
import { useFetch } from './Hooks/useFetch'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SERVER_URL = "https://utnotas.free.beeceptor.com";


function App() {
  const location = useLocation();
  const { data, isLoading, error } = useFetch("/apuntes", SERVER_URL);
  if (isLoading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          <Route path="/search" element={<SearchResultApp results={data}/>} />
          <Route path="/material/:id" element={<MaterialRouteWrapper results={data}/>} />
          <Route path="/add" element={<CreateMaterialApp/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/myposts" element={<MyPosts results={data}/>} />
        </Routes>   
      </main>
    </>
  )
}

export default App
