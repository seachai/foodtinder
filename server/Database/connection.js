const mongoose = require('mongoose');

const mongooseURI = process.env.MONGOOSE_URI;

// Establish a connection to MongoDB
mongoose.connect(mongooseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
