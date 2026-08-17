import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../api/customers';
import { getProducts } from '../api/products';
import { createOrder } from '../api/orders';

export default function CreateOrder() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const addItem = () => {
        setItems([...items, { product_id: '', quantity: 1 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const total = items.reduce((sum, item) => {
        const product = products.find((p) => p.id === Number(item.product_id));
        if (!product) return sum;
        return sum + product.price * Number(item.quantity || 0);
    }, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await createOrder({
                customer_id: customerId,
                items: items.map((item) => ({
                    product_id: item.product_id,
                    quantity: Number(item.quantity),
                })),
            });
            navigate('/orders');
        } catch (err) {
            if (err.response?.status === 422) {
                const messages = Object.values(err.response.data.errors).flat();
                setError(messages.join(' '));
            } else {
                setError(err.response?.data?.message || 'No se pudo crear el pedido.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        getCustomers().then((response) => setCustomers(response.data));
        getProducts().then((response) => setProducts(response.data));
    }, []);

    return (
        <div>
            <h1>Crear pedido</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customer">Cliente</label>
                    <select
                        id="customer"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un cliente</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.company_name}
                            </option>
                        ))}
                    </select>
                </div>

                <h2>Productos</h2>
                {items.map((item, index) => (
                    <div key={index}>
                        <select
                            value={item.product_id}
                            onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                            required
                        >
                            <option value="">Selecciona un producto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} ({product.stock} en stock)
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                        >
                            Quitar
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addItem}>
                    + Añadir producto
                </button>

                <p>Total estimado: {total.toFixed(2)} €</p>

                {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Creando pedido...' : 'Crear pedido'}
                </button>
            </form>
        </div>
    );
}