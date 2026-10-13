import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useValidation';
import { login } from '../services/auth';

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const email = useInput('', { isEmpty: true, minLength: 3 });
  const password = useInput('', { isEmpty: true, minLength: 6 });

  const isFormValid = () => {
    return !email.isEmpty && !password.isEmpty && !password.minLengthError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Заполните email и пароль (от 6 символов)');
      return;
    }

    const result = await login(email.value, password.value);

    if (result.ok) {
      navigate('/cabinet');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Вход в аккаунт</h1>

        <label>
          Email:
          <input
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
        </label>

        <label>
          Пароль:
          <input
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            name="password"
            type="password"
            placeholder=""
          />
          {password.isDirty && password.isEmpty && <p className="error">Введите пароль</p>}
          {password.isDirty && password.minLengthError && <p className="error">Минимум 6 символов</p>}
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Войти</button>

        <div className="signin-link">
          <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;