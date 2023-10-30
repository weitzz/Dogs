import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import { UserStorage } from './Hooks/userContext'
import ProtectedRoute from "./components/Helper/ProtectedRoute"
import User from "./components/User/User"
import Photo from "./components/Photo/Photo"
import UserProfile from "./components/User/UserProfile"
import NotFound from "./components/NotFound"


function App() {

  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login/*' element={<Login />} />
          <Route path='conta/*' element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path='foto/:id' element={<Photo />} />
          <Route path='perfil/:user' element={<UserProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
