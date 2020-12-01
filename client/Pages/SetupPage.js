import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Wallpaper from '../public/images/setup.jpg';

const Wrapper = styled.div`
  background-image: url(${Wallpaper});
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

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

export default function Setup(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    city: '',
    cuisine: '',
  });
  const { setRestaurants, setMatch } = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    const { email, city, cuisine } = values;

    const user = {
      email,
      city,
      cuisine,
    };

    fetch('/api/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(({ restaurants, match }) => {
        setRestaurants(restaurants);
        setMatch(match);
        history.push({ pathname: '/homepage', state: props.location.state });
      })
      .catch((err) => console.log('error:', err));
    resetForm();
  };

  const resetForm = () => {
    return setValues({
      email: '',
      city: '',
      cuisine: '',
    });
  };

  return (
    <Wrapper>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Match your taste buds 🔥
          </Typography>
          <Typography component="h1" variant="h5">
            Find your friend
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Friend Email"
              placeholder="cohort21rocks@codesmith.io"
              name="email"
              autoComplete="off"
              autoFocus
              value={values.email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="cuisine"
              label="Find"
              placeholder="sushi, pasta, burgers, pizza..."
              autoComplete="off"
              type="text"
              id="cuisine"
              value={values.cuisine}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="city"
              label="Near"
              placeholder="NYC, LA, Chicago..."
              autoComplete="off"
              type="text"
              id="city"
              value={values.city}
              onChange={(e) => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Lets Match!
            </Button>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
}
