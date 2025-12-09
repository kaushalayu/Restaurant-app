import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate, getAvatarName } from '../../utils'

export default function CustomerInfo() {

   const cutomerData = useSelector((state)=> state.customer)
   const [dataTime,setDataTime] = useState(new Date())
  return (
    <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
              {cutomerData.customerName}
            </h1>
            <p className="text-xs text-[#ababab] font-medium mt-1">
              {cutomerData.orderID}/Dine in
            </p>
            <p className="text-xs text-[#ababab] font-medium mt-2">
              {formatDate(dataTime)}
            </p>
          </div>
          <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          {getAvatarName(cutomerData.customerName)}
          </button>
        </div>
  )
}
