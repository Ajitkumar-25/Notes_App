const mongoose = require("mongoose");
// const mongoURL = "mongodb://0.0.0.0:27017/Notes_App";
const mongoURL = "mongodb+srv://kajit0408:dFzDIRdPnpJ4wPE7@cluster1.psvnoka.mongodb.net/NotesApp?retryWrites=true&w=majority&appName=Cluster1";

const connectToMongo = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.on("error", () => console.log("Error in connecting to mongoDB"));
  connection.once("open", () => console.log("Connected to mongoDB"));
};
module.exports = connectToMongo;
