import React from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/slices/cartSlice";

export default function CartInfo() {
  const cartData = useSelector((state)=> state.cart);
  const dispatch = useDispatch()
  const handleRemove = (itemId)=>{
    dispatch(removeItem(itemId))
  }
  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4]">Order Details</h1>
      <div className="mt-4 overflow-y-scroll h-[180px]">
        {
           cartData.length === 0 ? (
            <p className="text-[#ababab] text-lg flex justify-center items-center h-[280px] ">Your Cart is Empty. Start adding items!</p>
           ) : cartData.map((item)=>{
              return(
                  <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                 <div className="flex items-center justify-between">
                   <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                     
                     {item.name}
                   </h1>
                   <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
                 </div>
                 <div className="flex items-center justify-between mt-3">
                   <div className="flex items-center gap-3">
                     <RiDeleteBin2Fill
                       className="text-[#ababab] cursor-pointer"
                       size={20}
                       onClick={()=>handleRemove(item.id)}
                     />
                     <FaNotesMedical
                       className="text-[#ababab] cursor-pointer"
                       size={20}
                     />
                   </div>
                   <p className="text-[#f5f5f5] text-md font-bold">{item.price}</p>
                 </div>
               </div>
              )
             })
        }
      </div>
    </div>
  );
}
