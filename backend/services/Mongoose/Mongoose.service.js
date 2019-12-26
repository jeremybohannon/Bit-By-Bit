const mongoose = require('mongoose');

class MongooseService {
  constructor(db_url = '') {
    this.mongoDB = process.env.MONGODB_URI || db_url;
  }

  async connect() {
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useNewUrlParser', true)
    mongoose.Promise = global.Promise;

    try  {
      await mongoose.connect(this.mongoDB);
    } catch (err) {
      console.log(err)
    }

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
}

module.exports = MongooseService