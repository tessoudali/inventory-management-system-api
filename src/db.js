import mongoose from 'mongoose';

/**
  *@description Function to connect to a database (MongoDB in this instance)
  *@param  {string} databaseURL
  *@returns {object} - new mongoDB connection
  */

const connectToDatabase = ({ databaseURL }) => {
  try {
    const defaultOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    };

    return mongoose.createConnection(databaseURL, defaultOptions);
  } catch (error) {
    throw error;
  }
};

export default connectToDatabase;
