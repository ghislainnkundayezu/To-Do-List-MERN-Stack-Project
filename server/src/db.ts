import mongoose from 'mongoose';

const DB_URL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aam2my6.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_URL)
  .then(result => console.log("Database connected"))
  .catch(error => console.log("Connection to the database failed: ", error));

export default mongoose.connection;