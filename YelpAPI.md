# Yelp API Endpoints

## Endpoints

https://api.yelp.com/v3/

## Search for location & type of food
Returns a business array with object containing 20 businesses

https://api.yelp.com/v3/businesses/search?location={CITY}&term={CUISINE}&limit={NUMBER}

req.params
CITY: Location of businesses,
CUSINE: Type of cusine,
LIMIT: Limit the number of results, default is 20

## Search for business

https://api.yelp.com/v3/businesses/{ID}

req.params
ID: Unique ID of business

## Get business reviews

https://api.yelp.com/v3/businesses/{ID}/reviews

## Query data (REST)

```javascript
const API_KEY = "YOUR_API_KEY"

fetch(`https://api.yelp.com/v3/businesses/search?location=${CITY}&term=${CUSINE}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .catch((err) => console.log(err));
```