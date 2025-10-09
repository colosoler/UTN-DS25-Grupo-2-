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
import { AuthProvider } from './Contexts/AuthContext'
import { PrivateRoute } from './Components/PrivateRoute'
import { useFetch } from './Hooks/useFetch'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/' || location.pathname === '/signup';
  return (
    <>
      <AuthProvider>
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/*Rutas públicas*/}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/result" element={<SearchResultPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/carrera/:id" element={<CarreraDetailPage/>} />
          <Route path="/search" element={<SearchResultPage/>} />
          <Route path="/material/:id" element={<MaterialRouteWrapper/>} />

          {/*Rutas protegidas (Usuarios logueados)*/}
          <Route path="/add" element={
            <PrivateRoute>
              <MaterialCreatePage/>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <SettingsPage/>
            </PrivateRoute>
          } />
          <Route path="/mymaterials" element={
            <PrivateRoute>
              <MyMaterialsPage/>
            </PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute>
              <MaterialEditPage/>
            </PrivateRoute>
          } />

          <Route path="/unauthorized" element={<h2>Página no encontrada</h2>} />
        </Routes>   
      </main>
      </AuthProvider>
    </>
  )
}

export default App
