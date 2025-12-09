import React, { useState } from "react";
import { menus } from "../../constants/pos_system_constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../Redux/slices/cartSlice";

export default function MenuContainer() {
  const [selected, setSelected] = useState(menus[0]);
   const[count,setCount]=useState(0);
   const[itemId,setItemId]=useState(0);
   const dispatch = useDispatch()
    const increment = (id)=>
  {
    setItemId(id)
    if(count==6)
    {
      return null
    }
    else
    {
      setCount((prev)=>prev+1 )
    }
  }

  const handleAddtoCart = (menu)=>{
    if(count === 0) return;
    const {name,price} = menu;
    const newObj = {id:new Date(),name,pricePerQuantity:price, quantity:count,price : price * count};

    dispatch(addItems(newObj))
    setCount(0);
  }
  const decrement = (id)=> {
    setItemId(id)
    if(count==0){
      return null
    }
     else{
    setCount((prev)=>prev-1)
  }
  }
  return (
    <>
      <div className="grid grid-cols-4 px-10 gap-4 py-4 w-full">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() =>{ 
                setSelected(menu);
                setItemId(0);
                setCount(0)
              }
            }
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 px-10 gap-4 py-4 w-full">
        {selected?.items.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between bg-[#1a1a1a] hover:bg-[#2a2a2a] p-4 rounded-lg h-[110px] cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.name}
                </h1>
                <button onClick={()=>handleAddtoCart(menu)} className="bg-[#2e4a40] text-white p-1 m-1 rounded-full"><FaShoppingCart size={20}/></button>
                </div>
              <div className="flex items-center justify-between w-full">
              <p className="text-[#f5f5f5] text-xl font-bold">
                {menu.price}
              </p>
               <div className="flex items-center justify-between rounded-lg py-2 px-3 gap-5 bg-[#1f1f1f]">
           <button
            onClick={()=>decrement(menu.id)}
             className="text-yellow-500 text-2xl cursor-pointer" >&minus;</button>
           <span className="text-white ">{menu.id === itemId ? count:'0'}</span>
           <button 
           onClick={()=>increment(menu.id)}
            className="text-yellow-500 text-2xl cursor-pointer">&#43;</button>

          </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
