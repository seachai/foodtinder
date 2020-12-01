exports.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id);
  return next();
};

exports.setFriendSSID = (req, res, next) => {
  res.cookie('friendssid', res.locals.friendId);
  return next();
};
