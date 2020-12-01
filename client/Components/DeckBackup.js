import React, { useState, useEffect } from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import { useAuth } from '../Context/Auth';
import Confetti from 'react-confetti';
import useWindowSize from '../utils/useWindowSize';

import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Card from './Card';
import CardButtons from './CardButtons';

import useStyles from './styles';
import fetch from 'node-fetch';

const Deck = (props) => {
  const classes = useStyles();
  const size = useWindowSize();

  const { restaurants, setRestaurants } = useAuth();
  const { match, setMatch } = useAuth();

  const [liked, setLiked] = useState([]);
  const [matched, setMatched] = useState(false);

  const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

  useEffect(() => {
    if (liked.length) {
      console.log('useEffect ran');
      postLiked(liked);

      // console.log('liked', liked, 'friends', match);
      if (matchRestaurants().length) {
        // alert('found a match');
        setMatched(true);
      }
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
      })
        .then((res) => res.json())
        .then(() => console.log('Sent liked restaurant to API'));
    } catch (err) {
      return console.log(err);
    }
  };

  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      let { id } = restaurants[0];
      setLiked([...liked, id]);
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

  return (
    <>
      {matched && <Confetti width={size.width} height={size.height} />}
      <Grid
        item
        xs={12}
        className={classNames(classes.marginTop2, classes.centerContent)}
      >
        <Swipeable renderButtons={renderButtons} onSwipe={handleOnSwipe}>
          <Card item={restaurants[0]} />
        </Swipeable>
      </Grid>
    </>
  );
};

export default Deck;
