require('dotenv').config();
const mongoose = require("mongoose");

const ConnectionDB = async()=>{
    try{

    
    const connection = await mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log("Databse is connected");
    })
}
catch(e)
{
    console.log(e);
    process.exit();
}
}

module.exports=ConnectionDB;