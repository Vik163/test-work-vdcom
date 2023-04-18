import React, { useEffect } from 'react';

import './Login.css';

import logo from '../../images/LOGO.png';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login(props) {
  const { handleLogin, formReset } = props;

  const [values, setValues] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  // Ввод данных =======================
  // Создаю объект с вводимыми данными --
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  // Сброс данных после успешной отправки =======
  useEffect(() => {
    if (formReset) {
      setValues({ email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  // Иконка пароля ==================
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login'>
      <img className='login__logo' src={logo} alt='Логотип' />

      <h2 className='login__title'>
        Welcome To CRM System Sign In To Your Account
      </h2>

      <form className='login__form' onSubmit={handleSubmit}>
        <label className='login__label'>
          <span className='login__input-title'>Login</span>
          <OutlinedInput
            id='outlined-adornment-password'
            type='text'
            name='login'
            onChange={handleChange}
            value={values.login ?? ''}
            required
          />
        </label>
        <label className='login__label'>
          <span className='login__input-title'>Password</span>
          <OutlinedInput
            id='outlined-adornment-password'
            name='password'
            type={!showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={values.password ?? ''}
            required
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </label>
        <button
          className='login__submit login__submit-login button-hover'
          type='submit'
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}

export default Login;
