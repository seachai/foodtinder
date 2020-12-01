const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const cookieController = require('../Controllers/cookieController');
const yelpController = require('../Controllers/yelpController');

/**
 * User Sign up /api/register
 */
router.post(
  '/register',
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({ id: res.locals.id });
  }
);

router.post(
  '/login',
  userController.loginUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({ id: res.locals.id });
  }
);

router.post(
  '/setup',
  userController.findUser,
  // cookieController.setFriendSSID,
  userController.addFriend,
  userController.matchFriend,
  yelpController.getRestaurants,
  (req, res) => {
    const { match, restaurants } = res.locals;
    console.log('match', match);
    console.log('data', restaurants);
    res.status(200).json({ match, restaurants });
  }
);

router.post('/liked', userController.likedRestaruant, (req, res) => {
  res.status(200).json({ working: true });
});

router.post('/info', yelpController.getRestaurantInfo, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
