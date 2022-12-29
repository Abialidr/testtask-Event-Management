import mongoose, { connect } from 'mongoose';
import seedInstall from './Seeds/SeedInstall';
export default () => {
  const db = 'mongodb://localhost:27017/event-management';
  connect(db)
    .then((db) => {
      console.log('connected');
      // return mongoose.connection.db.dropDatabase();
    })
    .then((data) => {
      seedInstall();
    });
};
