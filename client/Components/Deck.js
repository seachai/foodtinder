import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Swipeable, direction } from 'react-deck-swiper';
import { useAuth } from '../Context/Auth';
import Confetti from 'react-confetti';
import useWindowSize from '../utils/useWindowSize';
import styled from 'styled-components';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Card from './Card';
import CardButtons from './CardButtons';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #679;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const useStyles = makeStyles((theme) => ({
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

const Deck = (props) => {
  const classes = useStyles();
  const size = useWindowSize();
  const history = useHistory();

  const { restaurants, setRestaurants } = useAuth();
  const { match } = useAuth();
  const { info, setInfo } = useAuth();

  const [liked, setLiked] = useState([]);
  const [fade, setFade] = useState(false);

  const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

  useEffect(() => {
    if (liked.length) {
      postLiked(liked);
    }
    if (matchRestaurants().length) {
      getInfo();
      setFade(true);
    }
  }, [liked]);

  const matchRestaurants = () => {
    return liked.filter((el) => match.includes(el));
  };

  const postLiked = (data) => {
    const userData = {
      id: props.id,
      data,
    };
    try {
      fetch('/api/liked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
    } catch (err) {
      return console.log(err);
    }
  };

  const getInfo = () => {
    const restaurantId = {
      id: matchRestaurants()[0],
    };
    try {
      fetch('/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantId),
      })
        .then((res) => res.json())
        .then((data) => setInfo([data]));
    } catch (err) {
      return console.log(err);
    }
  };

  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      let { id } = restaurants[0];
      setLiked([...liked, id]);
      console.log(match);
      // console.log('your right');
    }

    if (swipeDirection === direction.LEFT) {
      // setLastSwipeDirection('your left');
      // console.log('your left');
    }

    setRestaurants((prev) => {
      return prev.slice(1);
    });
  };

  const renderButtons = ({ right, left }) => (
    <CardButtons right={right} left={left} />
  );

  const sendAnOrder = () => {
    history.push({ pathname: `/info` });
  };

  if (info) {
    return (
      <Wrapper>
        <Confetti width={size.width} height={size.height} />;
        <Fade in={fade}>
          <>
            <div className={classes.paper}>
              <Typography component="h1" variant="h4">
                Congratulations! We've found a match!
              </Typography>
              <Typography component="h1" variant="h4" className={classes.title}>
                {info[0].name}
              </Typography>
              <Card item={info[0]} />
            </div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.marginTop}
              onClick={() => {
                sendAnOrder();
              }}
            >
              Send an order
            </Button>
          </>
        </Fade>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Container className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" className={classes.title}>
            Food Tinder 🔥
          </Typography>
          <Grid
            item
            xs={12}
            className={classNames(classes.marginTop2, classes.centerContent)}
          >
            <Swipeable renderButtons={renderButtons} onSwipe={handleOnSwipe}>
              <Card item={restaurants[0]} />
            </Swipeable>
          </Grid>
          <Typography component="h1" variant="h5">
            Swipe right to match!
          </Typography>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Deck;
