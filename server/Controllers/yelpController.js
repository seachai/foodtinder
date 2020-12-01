const fetch = require('node-fetch');

exports.getRestaurants = (req, res, next) => {
  const { city, cuisine } = req.body;
  const API_KEY = process.env.YELP_API_KEY;
  const URL = `https://api.yelp.com/v3/businesses/search?location=${city}&term=${cuisine}`;

  try {
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        res.locals.restaurants = data.businesses;
        return next();
      });
  } catch (err) {
    return next();
  }
};

exports.getRestaurantInfo = (req, res, next) => {
  const { id } = req.body;
  const API_KEY = `FDUeKEhsX0fiIcpUQBvkiKKKV4kuoddwDAjTodGiFVZfT-gz-PTp_fE2yPsy4-qUOBbaJORW3Xhj9m6WLM2h6s0-mFA_NjatjYNu-XV-ziTVFpWvVBWcUcl2n8xxX3Yx`;
  const URL = `https://api.yelp.com/v3/businesses/${id}`;

  try {
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        res.locals.data = data;
        return next();
      });
  } catch (err) {
    return next();
  }
};
