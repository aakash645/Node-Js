require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const server = express();
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
console.log('env',process.env.DB_PASSWORD)

//db connection code
const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
};

connectToMongo();




//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default')); 
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));

server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build' ,'index.html'))
})

server.listen(process.env.PORT, () => {
  console.log('server started');
});