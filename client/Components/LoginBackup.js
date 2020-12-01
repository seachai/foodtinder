import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import validator from 'validator';

const Login = () => {
  const [values, setValues] = useState({});
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
    const { email, password } = values;

    // const validateEmail = validator.isEmail(email);

    // if (!validateEmail) {
    //   alert('Please enter another email.');
    //   resetForm();
    // }
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   resetForm();
    // }
    registerUser();
  };

  const registerUser = () => {
    const { email, password } = values;
    const user = {
      email,
      password,
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          history.push({ pathname: `/settings/`, state: res.id });
        } else {
          alert('Wrong login creditionals');
        }
      })
      .catch((err) => console.log('error:', err));
    resetForm();
  };

  const resetForm = () => {
    return setValues({
      email: '',
      password: '',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
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
      <input type="submit"></input>
    </form>
  );
};

export default Login;
