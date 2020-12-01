const { User } = require('../Models/UserModel');

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, friend } = req.body;

    const user = {
      email,
      password,
      friend,
      liked: [],
      matched: false,
    };

    const userCreated = await User.create(user);
    res.locals.id = userCreated.id;
    return next();
  } catch (err) {
    return next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email, password });
    res.locals.id = userExist.id;
    return next();
  } catch (err) {
    return next(err);
  }
};

exports.findUser = async (req, res, next) => {
  try {
    const { email } = req.body; // Email of friend
    const userExist = await User.findOne({ email });

    if (userExist) {
      // If we find user, save the id then go to next middleware
      res.locals.friendId = userExist.id;
      return next();
    }

    // we need to do something here if the user does not have a friend yet
  } catch (err) {
    return next(err);
  }
};

exports.addFriend = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;
    const { friendId } = res.locals;
    const query = { _id: ssid };
    await User.findOneAndUpdate(
      query,
      { friend: friendId },
      {
        new: true,
        upsert: true,
      }
    ).then(() => next());
  } catch (err) {
    return next(err);
  }
};

exports.matchFriend = async (req, res, next) => {
  try {
    const { friendId } = res.locals;
    const query = { _id: friendId };
    await User.findOne(query).then((data) => {
      res.locals.match = data.liked;
      return next();
    });
  } catch (err) {
    return next(err);
  }
};

exports.likedRestaruant = async (req, res, next) => {
  try {
    const { id, data } = req.body;
    const query = { _id: id };
    await User.findOneAndUpdate(
      query,
      { liked: data },
      {
        new: true,
        upsert: true,
      }
    ).then(() => next());
    return next();
  } catch (err) {
    return next(err);
  }
};
