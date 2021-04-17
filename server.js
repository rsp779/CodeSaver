const path = require('path');
const express =require("express");
const connectDB=require('./config/db');
const errorHandler =require('./middleware/error');

//connect DB
connectDB();

const app=express();

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/private'));
//Error handler should be last piece of middleware
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
     // Set static folder
     app.use(express.static('client/build'));
   
     app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
     });
   }

const PORT =process.env.PORT || 5000;

const server=app.listen(PORT ,() => console.log(`Server running on PORT ${PORT}`));

process.on("unhandledRejection",(err,promise)=>{
     console.log(`Logged Error : ${err}`);
     server.close(() =>process.exit(1));
})