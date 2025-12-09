import React from 'react'
import { getBgColor } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateTable } from '../../Redux/slices/customerSlice';

export default function TableCard({key,name,status,initials,seats}){
const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick=(name)=>{
    if(status === "Booked") return;
    dispatch(updateTable({tableNo:name}))
    navigate('/menu')
  }
  return (
    <div onClick={()=>handleClick(name)} key={key} className='bg-[#262626] w-[300px] hover:bg-[#1f1f1f]  rounded-lg cursor-pointer'>
        <div className='flex items-center justify-between px-1'>
            <h1 className='text-[#f5f5f5] text-xl font-semibold'>{name}</h1>
            <p className={`px-2 py-1 rounded-lg ${status==="Booked"?"text-green-600 bg-[#2e4a40]":"text-[#f6b100] bg-yellow-100"}`}>{status}</p>

        </div>
        <div className='flex items-center justify-center my-5'>
          <h1 className={` bg-[#025cca] text-white rounded-full p-5 text-xl`}   style={{ backgroundColor: getBgColor() }}>{initials}</h1>

        </div>
        <p className='text-[#ababab] text-xs'>Seats: <span className='text-[#f5f5f5]'>{seats}</span></p>

    </div>
  )
}
