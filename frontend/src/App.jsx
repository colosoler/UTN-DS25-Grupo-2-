import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './Apps/HomePage'
import { CarreraDetailPage } from './Apps/CarreraDetailPage'
import { SearchResultPage} from './Apps/SearchResultPage'
import MaterialRouteWrapper from './Apps/MaterialRouteWrapper'
import { Navbar } from './Components/Navbar'
import { LoginPage } from './Apps/LoginPage'
import { SignupPage } from './Apps/SignupPage'
import { MaterialCreatePage } from './Apps/MaterialCreatePage'
import { ProfilePage } from './Apps/ProfilePage'
import { SettingsPage } from './Apps/SettingsPage'
import { MyMaterialsPage } from './Apps/MyMaterialsPage'
import { MaterialEditPage } from './Apps/MaterialEditPage'
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
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/result" element={<SearchResultPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/carrera/:id" element={<CarreraDetailPage/>} />
          <Route path="/search" element={<SearchResultPage/>} />
          <Route path="/material/:id" element={<MaterialRouteWrapper/>} />
          <Route path="/add" element={<MaterialCreatePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/myposts" element={<MyMaterialsPage/>} />
          <Route path="/edit/:id" element={<MaterialEditPage/>} />

        </Routes>   
      </main>
    </>
  )
}

export default App
