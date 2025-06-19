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

const results = [
  { id: '1',
    user: 'user1', 
    title: 'Titulo', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { id: '2',
    user: 'user2', 
    title: 'Titulo23', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { id: '3',
    user: 'user3', 
    title: 'Titulo3', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  }
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
        </Routes>   
      </main>
    </>
  )
}

export default App
