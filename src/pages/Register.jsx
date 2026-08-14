import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);
        setSubmitting(true);

        try {
            await register(form);
            navigate('/products');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setGeneralError('No se pudo completar el registro. Inténtalo de nuevo.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Crear cuenta</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" role="alert" style={{ color: 'red' }}>{errors.name[0]}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" role="alert" style={{ color: 'red' }}>{errors.email[0]}</p>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    {errors.password && <p id="password-error" role="alert" style={{ color: 'red' }}>{errors.password[0]}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation">Confirmar contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                    />
                </div>

                {generalError && <p role="alert" style={{ color: 'red' }}>{generalError}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </form>
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
    );
}