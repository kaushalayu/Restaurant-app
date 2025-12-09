import React from 'react'
import { FaBackward } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Backbutton() {
    const navigate = useNavigate();
  return (
    <button onClick={()=>navigate(-1)} className='bg-[#025cca] p-2 text-xl  rounded-lg text-white'>
        <FaBackward />
    </button>
  )
}
