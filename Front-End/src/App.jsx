import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />

      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
}
