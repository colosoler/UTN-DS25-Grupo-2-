import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './Apps/HomePage'
import { CarreraDetailPage } from './Apps/CarreraDetailPage'
import { SearchResultPage} from './Apps/SearchResultPage'
import { MaterialPage} from './Apps/MaterialPage'
import { Navbar } from './Components/Navbar'
import { LoginPage } from './Apps/LoginPage'
import { SignupPage } from './Apps/SignupPage'
import { MaterialCreatePage } from './Apps/MaterialCreatePage'
import { ProfilePage } from './Apps/ProfilePage'
import { SettingsPage } from './Apps/SettingsPage'
import { MyMaterialsPage } from './Apps/MyMaterialsPage'
import { MaterialEditPage } from './Apps/MaterialEditPage'
import { AdminPage } from './Apps/AdminPage'
import { RankingPage } from './Apps/RankingPage'
import { AuthProvider } from './Contexts/AuthContext'
import { PrivateRoute } from './Components/PrivateRoute'
import { useFetch } from './Hooks/useFetch'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <>
      <AuthProvider>
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/*Rutas públicas*/}
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/carrera/:id" element={<CarreraDetailPage/>} />
          <Route path="/search" element={<SearchResultPage/>} />
          <Route path="/material/:id" element={<MaterialPage/>} />
          <Route path="/ranking" element={<RankingPage/>} />
          <Route path="/admin/" element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminPage/>
            </PrivateRoute>
          }
            />

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
