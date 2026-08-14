import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import { useAuth } from '../context/AuthContext';

export default function Products() {
    const { user, logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div>
            <header>
                <p>Hola, {user?.name}</p>
                <button onClick={logout}>Cerrar sesión</button>
            </header>

            <h1>Productos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} — {product.price} € ({product.stock} en stock)
                    </li>
                ))}
            </ul>
        </div>
    );
}