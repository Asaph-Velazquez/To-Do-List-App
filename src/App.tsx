import { Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

{/*Componetns imports*/}
import HomePage from './components/HomePage'
import { Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
