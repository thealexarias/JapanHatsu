import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import './App.css'

export default function App() {


  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}