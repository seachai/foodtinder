import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import validator from 'validator';

const Register = () => {
  const [values, setValues] = useState({});
  const { setAuth } = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = values;

    const validateEmail = validator.isEmail(email);

    if (!validateEmail) {
      alert('Please enter another email.');
      resetForm();
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      resetForm();
    }
    registerUser();
  };

  const registerUser = () => {
    const { email, password } = values;
    const user = {
      email,
      password,
      friend: null,
    };

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
          history.push('/settings');
        }
      })
      .catch((err) => console.log('error:', err));
    resetForm();
  };

  const resetForm = () => {
    return setValues({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Register account:</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={values.email}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={values.password}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={values.confirmPassword}
        onChange={(e) => handleChange(e)}
      />
      <input type="submit"></input>
    </form>
  );
};

export default Register;
