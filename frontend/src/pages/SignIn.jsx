// src/pages/SignIn.jsx
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useValidation'

function SignIn() {

  const email = useInput('',{isEmpty: true, minLength: 3})
  const password = useInput('', {isEmpty: true, minLength: 6})

  const isFormValid = () => {
    return (
      
      !email.isEmpty &&
      !password.isEmpty

      
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Форма отправлена');
      alert('Вход успешный!');
    }
    else{
      console.log('Ошибка');
      alert('Форма не заполнена!')
    }
  };





  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Вход в аккаунт</h1>
        
        <label>
          Email:
          <input  onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="email" placeholder="example@gmail.com"/>
        </label>
        
        <label>
          Пароль:
          <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder=""/>
          {password.isDirty && password.isEmpty && <p className="error">Введите пароль</p>}
          {password.isDirty && password.minLengthError && <p className="error">Минимум 6 символов</p>}
        

        </label>
        
        <button type="submit">Войти</button>
        
        <div className="signin-link">
          <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;  