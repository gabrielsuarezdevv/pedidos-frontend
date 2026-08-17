import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/orders';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders()
            .then((response) => setOrders(response.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando pedidos...</p>;

    return (
        <div>
            <h1>Pedidos</h1>
            <Link to="/orders/new">Crear pedido nuevo</Link>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        Pedido #{order.id} — {order.customer.company_name} — {order.total} € — {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}