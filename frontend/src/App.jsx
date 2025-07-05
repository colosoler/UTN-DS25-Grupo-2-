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
import { EditMaterial } from './Apps/EditPost.jsx'
import { useFetch } from './Hooks/useFetch'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
          <Route path="/search" element={<SearchResultApp/>} />
          <Route path="/material/:id" element={<MaterialRouteWrapper/>} />
          <Route path="/add" element={<CreateMaterialApp/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/myposts" element={<MyPosts/>} />
          <Route path="/edit/:id" element={<EditMaterial />} />

        </Routes>   
      </main>
    </>
  )
}

export default App
