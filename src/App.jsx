import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Error from './pages/Error'
import { useSelector } from 'react-redux'
import UserDashboard from './pages/UserDashboard'
import NoteInput from './components/core/note/NoteInput'

function App() {
  const {token} = useSelector((state)=> state.auth);


  return (
    <>
    <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

        

        <Route element={<UserDashboard/>}>
          {
              token && (
                <Route path='/dashboard/home' element={<NoteInput/>}/>
              )
          }
        </Route>



        <Route path='*' element={<Error/>}/>
        
        
     </Routes>
    </>
  )
}

export default App
