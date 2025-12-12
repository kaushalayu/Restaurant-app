require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const morgan = require("morgan");
const ConnectionDB = require('./Config/db');
const global = require('./middleware/globalError');
const router = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const routers = require("./routes/orderRoute")
const routerss  = require("./routes/tableRoute")


// middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())


app.use("/api/user",router);
app.use("api/order",routers);
app.use("api/table",routerss);
app.use("/api/payment", require("./routes/paymentRoute"));


// Database..
ConnectionDB();


// root end point
app.get("/",(req,res)=>{
    res.json({message:"true"});
})

// global error handler
app.use(global);



app.listen(PORT,()=>{
  console.log("Server is listining");
})