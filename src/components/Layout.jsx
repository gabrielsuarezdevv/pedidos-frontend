import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
    const { user, logout, hasRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div>
            <header>
                <nav>
                    <Link to="/products">Productos</Link>
                    {!hasRole('cliente') && <Link to="/customers">Clientes</Link>}
                    <Link to="/orders">Pedidos</Link>
                </nav>
                <div>
                    <span>Hola, {user?.name}</span>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}