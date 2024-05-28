import mongoose from 'mongoose';

const DB_URL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aam2my6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const DatabaseConnection = async () => {
  try {
        const connection = await mongoose.connect(DB_URL, {
            dbName: process.env.DB_COLLECTION,
        });
        console.log("Database Successfully Connected");
        console.log(`Database Name: ${connection.connections[0].name}`)
  }catch(error) {
        //@ts-ignore
        console.log("Connection to the database failed: ", error.message)  
  }
}


export default DatabaseConnection;
