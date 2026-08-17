import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Layout from './components/Layout';
import Customers from './pages/Customers';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={ <ProtectedRoute> <Layout /> </ProtectedRoute>}>
                  <Route path="/products" element={<Products />} />
                  <Route path="/customers" element={<Customers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
