import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MaterialCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardMedia: {
    objectFit: 'cover',
    objectPosition: 'top',
    userSelect: 'none',
    pointerEvents: 'none',
  },
});

export default function Card({
  item: { name, rating, image_url, location, review_count, display_phone },
}) {
  const classes = useStyles();

  return (
    <MaterialCard className={classes.root}>
      <CssBaseline />
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          height="350"
          image={image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
            Rating: {rating} out of {review_count} reviews
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {display_phone}
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {location.display_address[0]}
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {location.display_address[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MaterialCard>
  );
}
