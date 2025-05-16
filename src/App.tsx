import { Route } from 'react-router-dom' 
import { useState } from 'react'
import { Routes } from 'react-router-dom'

import './App.css'
import './index.css'

{/*Componetns imports*/}
import HomePage from './components/HomePage'
import NavBar from './components/Essentials/navBar'
import Footer from './components/Essentials/footer'
import RForm from './components/Registration/rForm'
import ToDoForm from './components/ToDo/ToDoForm'
import ToDoList from './components/ToDo/ToDoList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/rForm' element={<RForm/>}/>
        <Route path='/ToDoList' element={<ToDoList/>}/>
        <Route path='/ToDoForm' element={<ToDoForm/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
