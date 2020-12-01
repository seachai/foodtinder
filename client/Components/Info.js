import React from 'react';
import { useAuth } from '../Context/Auth';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import NavigationIcon from '@material-ui/icons/Navigation';
import styled from 'styled-components';

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
  root: {
    width: '500px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Info() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { info } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(info);

  if (info) {
    return (
      <Wrapper>
        <Card className={classes.root}>
          <CardHeader title={info[0].name} />
          <CardMedia className={classes.media} image={info[0].image_url} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              It will take 26 minutes to get to {info[0].name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {info[0].location.display_address[0]}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {info[0].location.display_address[1]}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="call restaurant">
              <PhoneIphoneIcon />
            </IconButton>
            <IconButton aria-label="navigate towards it">
              <NavigationIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Reviews:</Typography>
              <Typography paragraph>
                Okay so because of lockdown COVID-19 I have been ordering food
                online and delivered to my house. Since I was craving for Pho I
                had to yelp it to find Pho...
              </Typography>
              <Typography paragraph>
                In my desperation to eat something other than food I cooked I
                decided to pay Bé-Em a visit. After looking them up on Yelp the
                food looked pretty interesting...
              </Typography>
              <Typography paragraph>
                Yum. Asian food will never be the same. Ordered curbside pick
                up. Quality ingredients and delicious flavors. I got the shrimp
                and chicken bowl with veggies...
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Wrapper>
    );
  }
}
