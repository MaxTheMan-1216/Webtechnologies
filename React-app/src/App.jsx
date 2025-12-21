import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import UsersPage from './components/hooks/UsersPage.jsx';
import Shop from './components/Shop.jsx';
import Home from "./components/Home.jsx"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/shop" element = {<Shop/>} />
          <Route path="/users" element = {<UsersPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
