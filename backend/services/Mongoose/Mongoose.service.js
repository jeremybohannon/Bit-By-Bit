const mongoose = require('mongoose');

class MongooseService {
  constructor(db_url = '') {
    let dev_db_url = db_url;
    this.mongoDB = process.env.MONGODB_URI || dev_db_url;
  }

  connect() {
    mongoose.connect(this.mongoDB);
    mongoose.Promise = global.Promise;
    
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
}

module.exports = MongooseService