import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

import logo from '../../images/LOGO.png';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login(props) {
  const { handleLogin, formReset } = props;

  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState(false);
  const [errors, setErrors] = React.useState({
    password: '',
  });
  const [inputEventTarget, setInputEventTarget] = React.useState({});
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  //Ввод данных и валидация
  const handleChange = (event) => {
    setInputEventTarget(event.target);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setIsName(name);
    setValues({ ...values, [name]: value });
  };

  // Валидация email и password ----------------------------------------------
  useEffect(() => {
    if (values.email) {
      if (values.email.match(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i) === null) {
        setEmailValid({
          valid: false,
          message: 'Некорректный адрес электронной почты ',
        });
      } else {
        setEmailValid({ valid: true });
      }
    }
    if (inputEventTarget.name === 'password') {
      setPasswordValid(inputEventTarget.closest('input').checkValidity());
      setErrors({
        ...errors,
        [inputEventTarget.name]: inputEventTarget.validationMessage,
      });
    }
  }, [values]);

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValues({ email: '', password: '' });
      setErrors({});
    }
  }, [formReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

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
