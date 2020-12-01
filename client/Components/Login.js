import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#fff',
    padding: theme.spacing(5),
    borderRadius: '4px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    margin: theme.spacing(1),
  },
}));

export default function Login({ setHasAccount }) {
  const classes = useStyles(); // useStyles for material ui
  const history = useHistory(); // useHistory to push path upon successful login
  const emailForm = useRef(null);

  // hook state for form values
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Focus on email field on state change
    emailForm.current.focus();
  }, []);

  // handles input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = values;
    // validate email before logging in
    const validateEmail = validator.isEmail(email);

    if (!validateEmail) {
      alert('Please enter a valid email address.');
      resetForm();
    } else {
      userLogin();
    }
  };

  // user sign in
  const userLogin = () => {
    // Email and password values from state
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
        // checks if res.id is returned from database
        if (res.id) {
          history.push({ pathname: `/setup`, state: res.id });
        } else {
          alert('Wrong login creditionals');
          resetForm();
        }
      })
      .catch((err) => console.log('error:', err));
  };

  const resetForm = () => {
    // Reset form values
    setValues({
      email: '',
      password: '',
    });
    // Then set a focus on the email field
    emailForm.current.focus();
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.title}>
          Sign In
        </Typography>
        <Typography component="h1" variant="h5">
          Food Tinder 🔥
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            inputRef={emailForm}
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                onClick={() => {
                  setHasAccount(false);
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
