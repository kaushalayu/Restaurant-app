import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import {useLocation, useNavigate} from 'react-router-dom'
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import {useDispatch} from 'react-redux'
import Modal from "./Modal";
import { setCustomer } from "../../Redux/slices/customerSlice";

export default function BottomNav() {
  const[isOpen,setIsOpen]=useState(false);
  const openModel = ()=> setIsOpen(true);
  const closeModel = ()=> setIsOpen(false);
  const[count,setCount]=useState(0);
  const[name,setName] = useState();
  const[phone,setPhone] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const location = useLocation();

  const isActive = (path)=> location.pathname === path;


  const increment = ()=>
  {
    if(count==6)
    {
      return null
    }
    else
    {
      setCount((prev)=>prev+1 )
    }
  }
  const decrement = ()=> {
    if(count==0){
      return null
    }
     else{
    setCount((prev)=>prev-1)
  }
  }
 

  const handleChangeOrder = ()=>{
    //  send the data to store
    dispatch(setCustomer({name,phone,guests:count}));
    navigate('/tables')
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button onClick={()=>navigate('/')} className={`${isActive("/") ? "text-[#f5f5f5] bg-[#343434]":"text-[#f5f5f5]"} w-[200px] rounded-[20px] flex items-center justify-center`}>
        <IoHomeOutline className="inline mr-4" size={20} /> <p>Home</p>
      </button>
      <button onClick={()=>navigate('/orders')} className={` flex items-center justify-center w-[200px] rounded-[20px] ${isActive('/orders')?" bg-[#343434] text-[#f5f5f5]":"text-[#f5f5f5]"}`}>
        <MdOutlineRecordVoiceOver className="inline mr-4" size={20}/>
        <p>Orders</p>
      </button>
      <button className=" absolute bottom-7 bg-[#F68100] text-[#f5f5f5] rounded-full p-3 items-center" onClick={openModel}>
        <BiSolidDish size={30} />

      </button>
      <Modal isOpen={isOpen} onClose={closeModel} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input type="text"  value={name}  onChange={(e)=>setName(e.target.value)} name="" placeholder="Enter Customer Name" id="" className="bg-transparent flex-1 text-white focus:outline-none" />

          </div>

        </div>
         <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Customer Number</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} name="" placeholder="Enter Customer Number" id="" className="bg-transparent flex-1 text-white focus:outline-none" />

          </div>

        </div>
       <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Guest</label>
          <div className="flex items-center justify-between rounded-lg py-3 px-4 bg-[#1f1f1f]">
           <button onClick={decrement} className="text-yellow-500 text-2xl" >&minus;</button>
           <span className="text-white">{count} person</span>
           <button onClick={increment} className="text-yellow-500 text-2xl">&#43;</button>

          </div>

        </div>
        <button onClick={handleChangeOrder} className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-800">Create Order</button>

      </Modal>
      <button  disabled={isActive} onClick={()=>navigate('/tables')} className={`flex items-center justify-center w-[200px] rounded-[20px] ${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]":"text-[#f5f5f5]"}`}>
        <MdTableBar className="inline mr-4" size={20}/>
        <p>Table</p>
      </button>
      <button className="text-[#ababab] flex items-center justify-center w-[200px]">
        <CiCircleMore className="inline mr-4" size={20}/>
        <p>More</p>
      </button>
      
    </div>
  );
}
