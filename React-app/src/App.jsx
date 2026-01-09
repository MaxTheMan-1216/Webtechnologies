import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UsersPage from './components/hooks/UsersPage.jsx';
import Shop from './components/Shop.jsx';
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MyAccount from './components/MyAccount.jsx';
import Cart from './components/Cart.jsx';
import MyItems from './components/MyItems.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/login' element={<MyAccount />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-items' element={<MyItems />} />
        </Routes>
        <Footer />
       </BrowserRouter>
    
    </>
  )
}

export default App
