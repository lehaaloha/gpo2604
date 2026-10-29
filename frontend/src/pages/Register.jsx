import { useEffect, useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useValidation';
import { register } from '../services/auth';




function Register() {
  const email = useInput('',{isEmpty: true, minLength: 3})
  const password = useInput('', {isEmpty: true, minLength: 6})
  const secondname = useInput('', {isEmpty: true} )
  const name = useInput('', {isEmpty: true} )
  const aprovepassword = useInput('', { isEmpty: true, minLength: 6, isMatch: password.value });
  const [agree, setAgree] = useState(false);
  const phone = useInput('', { isEmpty: true});
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);



const isFormValid = () => {
    return (
      !name.isEmpty &&
      !secondname.isEmpty &&
      !email.isEmpty &&
      !phone.isEmpty &&
      !password.isEmpty &&
      !aprovepassword.isEmpty &&
      !password.minLengthError &&
      !aprovepassword.minLengthError &&
      !aprovepassword.matchError &&
      agree
    );
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    aprovepassword.onBlur();

    if (!isFormValid()) {
      if (aprovepassword.matchError) setServerError('Пароли не совпадают');
      else setServerError('Заполните все поля и отметьте согласие');
      return;
    }

    setLoading(true);
    const result = await register({
      firstName: name.value.trim(),
      lastName: secondname.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      password: password.value,
    });
    setLoading(false);

    if (result.ok) {
      navigate('/signin');
    } else {
      setServerError(result.error);
    }
  };


  return (
    <div className="register-page">

      <section className= "brand-side">
        <div className="brand-content">
          <span className= "brand-label">ТУСУР</span>

          <h2>
            Система автоматизированной
            <br />
            оценки IT-специалистов
          </h2>
        </div>

        <div className="brand-pattern" ></div>

        </section>

      <section className="form-side">

        <form onSubmit={handleSubmit} >
          <h1>Регистрация</h1>
          

        <div className='namerow'>

          <label>
            Имя:
            <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} value={name.value} name="firstname" type="text" placeholder="Введите имя"/>
          </label>
          
          <label>
            Фамилия:
            <input onChange={e => secondname.onChange(e)} onBlur={e => secondname.onBlur(e)} value={secondname.value} name="secondname" type="text" placeholder="Введите фамилию"/>
          </label>

        </div>

          
          
          
          <label>
            Email:
            <input  onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="email" placeholder="example@gmail.com"/>
          </label>
          
          <label>
            Телефон:
            <input  onChange={phone.onChange}  onBlur={phone.onBlur} value={phone.value} name="number" type="tel" placeholder="89527775267"/>
            {phone.isDirty && phone.isEmpty && <p className="error">Введите телефон</p>}
          </label>
          
          <label>
            Пароль:
            <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder=""/>
            {password.isDirty && password.isEmpty && <p className="error">Введите пароль</p>}
            {password.isDirty && password.minLengthError && <p className="error">Минимум 6 символов</p>}
          

          </label>

          <label>
            Подтверждение пароля:
            <input onChange={aprovepassword.onChange}  
              onBlur={aprovepassword.onBlur}      
              value={aprovepassword.value} name="aprovepassword" type="password" placeholder=""/>
          </label>


          <label className='checkbox-label'>
            <input name = "cb" type = "checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
            <span>Согласие на обработку персональных данных</span>
          </label>

          {serverError && <p className="error">{serverError}</p>}

          <button type="submit" disabled={loading}>{loading ? 'Отправка...' : 'Подтвердить'}</button>
          
          
          <div className="signin-link">
            <Link to="/signin" className="toSignIn">Уже есть аккаунт? Войти</Link>
          </div>
          
        </form>
        
        </section>

      </div>
  )
}

export default Register