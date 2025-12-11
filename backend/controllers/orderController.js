const Order = require('../models/orderModel');
const createHttpError = require("http-errors");

const addOrder = async(req,res)=>{
    try
    {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({success:true,message:"Order Created",data:order})

    }
    catch(error)
    {
        next(error)
    }

}

const getOrder = async(req,res)=>{
    try
    {
        const order = await Order.findById(req.params.id);
        if(!order)
        {
            const error = createHttpError(404,"Order not found");
            return next(error);
        }
        res.status(200).json({success:true,data:order})

    }
    catch(error)
    {
        next(error);
    }
    
}

const getOrders = async(req,res)=>{
    try
    {
        const orders = await Order.find();
        res.status(200).json({data:orders});

    }
    catch(eror)
    {
        next(eror)
    }
    
}

const updateOrder = async(req,res)=>{
    try
    {
        const {orderStatus} = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id,{orderStatus},{new:true})

        if(!order)
        {
             const error = createHttpError(404,"Order not found");
            return next(error);

        }
        res.status(200).json({message:"Updated successfully",success:true,data:order})

    }
    catch(eror)
    {
        next(eror)
    }
    
}
module.exports = {addOrder,getOrder,getOrders,updateOrder}