import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
