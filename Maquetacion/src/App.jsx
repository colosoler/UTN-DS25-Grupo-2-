import './App.css'
import { HomeApp } from './Apps/HomeApp'
import { CarreraDetailApp } from './Apps/CarreraDetailApp'
import { SearchResultApp} from './Apps/SearchResultApp'
import { Navbar } from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<SearchResultApp/>} />
          <Route path="/home" element={<HomeApp/>} />
          <Route path="/carrera/:id" element={<CarreraDetailApp/>} />
          <Route path="/search" element={<SearchResultApp/>} />
        </Routes>   
      </main>
    </>
  )
}

export default App
