import { useState, useEffect } from 'react';
import { getCustomers } from '../api/customers';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomers()
            .then((response) => setCustomers(response.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando clientes...</p>;

    return (
        <div>
            <h1>Clientes</h1>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.company_name} — {customer.tax_id} ({customer.pricing_tier})
                    </li>
                ))}
            </ul>
        </div>
    );
}