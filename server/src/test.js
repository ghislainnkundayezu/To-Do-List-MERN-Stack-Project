//import mongoose from 'mongoose';
const mongoose = require('mongoose')
const DB_username = "ghislainnkundayezu";
const DB_password = "U5gP8OJxqyAFtSk3";
const DB_URL = `mongodb+srv://ghislainnkundayezu:${DB_password}@cluster0.aam2my6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_URL)
  .then(result => console.log("Database connected"))
  .catch(error => console.log("Connection to the database failed: "));

//export default mongoose.connection;