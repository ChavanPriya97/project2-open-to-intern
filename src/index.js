const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const multer = require("multer")
const app = express();

app.use(express.json());
app.use(multer().any());

mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb+srv://PriyankaChavan:priyanka@cluster0.iocf9uz.mongodb.net/project-OpenToIntern",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB connected successfully"))
  .catch( (error) => console.log(error.message));

app.use("/",route);

app.listen(3001,function(){ 
    console.log("application running on port : " + 3001 );
})