import { Route } from 'react-router-dom' 
import { useState } from 'react'
import { Routes } from 'react-router-dom'

import './App.css'
import './index.css'

{/*Componetns imports*/}
import PrivateRoutes from './components/Essentials/PrivateRoutes'
import HomePage from './components/HomePage'
import NavBar from './components/Essentials/navBar'
import Footer from './components/Essentials/footer'
import RForm from './components/Registration/rForm'
import ToDoForm from './components/ToDo/ToDoForm'
import ToDoList from './components/ToDo/ToDoList'
import Login from './components/Login/Login'
import TaskEdit from './components/ToDo/TaskEdit'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/rForm' element={<RForm/>}/>
        <Route path='/ToDoList' element={<PrivateRoutes><ToDoList/></PrivateRoutes>}/>
        <Route path='/ToDoForm' element={<PrivateRoutes><ToDoForm/></PrivateRoutes>}/>
        <Route path='/TaskEdit' element={<PrivateRoutes><TaskEdit/></PrivateRoutes>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
