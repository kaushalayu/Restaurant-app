import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import Header from './components/shared/Header'
import Tables from './pages/Tables'
import Menu from './pages/Menu'
import RouteLoader from './components/shared/RouterLoader'

function App() {


  return (
   <>
   <Router>
    <Header/>
    <RouteLoader/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/tables' element={<Tables/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='*' element={<div>Not Found</div>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App
