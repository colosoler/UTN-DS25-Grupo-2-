import './App.css'
import { HomeApp } from './Apps/HomeApp'
import { CarreraDetailApp } from './Apps/CarreraDetailApp'
import { SearchResultApp} from './Apps/SearchResultApp'
import { Navbar } from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './Apps/Login'

function App() {
  const location = useLocation();

  // Con esto oculto el Navbar cuando estamos en Login
  const hideNavbar = location.pathname === '/';
  return (
    <>

      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/result" element={<SearchResultApp/>} />
          <Route path="/home" element={<HomeApp/>} />
          <Route path="/carrera/:id" element={<CarreraDetailApp/>} />
          <Route path="/search" element={<SearchResultApp/>} />
        </Routes>   
      </main>
    </>
  )
}

export default App
