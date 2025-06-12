import './App.css'
import { HomeApp } from './Apps/HomeApp'
import { CarreraDetailApp } from './Apps/CarreraDetailApp'
import { SearchResultApp} from './Apps/SearchResultApp'
import { Navbar } from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './Apps/Login'
import { Signup } from './Apps/Signup'

function App() {
  const location = useLocation();

  // Con esto oculto el Navbar cuando estamos en Login o en Signup
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
        </Routes>   
      </main>
    </>
  )
}

export default App
