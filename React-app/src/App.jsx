import { useState } from 'react'
import './App.css'
import SimpleClassComponent from './components/SimpleClassComp.jsx'
import SimpleFunctionalComponent from './components/SimpleFunctionalComp.jsx'
import { Student, Teacher } from './components/helper.js'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HooksContainer from './components/HooksContainer.jsx';
import ThemeComponent from './components/ThemeComponent.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import UsersPage from './components/hooks/UsersPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element = {<SimpleClassComponent />} />
            <Route path="/functional" element = {<SimpleFunctionalComponent student={Student} teacher={Teacher} />} />
            <Route path="/hooks" element = {<HooksContainer />} /> 
            <Route path="/theme" element = {<ThemeComponent />} />
            <Route path="/users" element = {<UsersPage/>} />
          </Routes>

        </BrowserRouter>
      </ThemeProvider>
    
    </>
  )
}

export default App
