import React from 'react'
import { popularDishes } from '../../constants/pos_system_constants'

export default function PopularDish() {
  return (
  <div className="mt-6 pr-6">
  <div className="bg-[#1a1a1a] w-full rounded-lg">
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Popular Dish</h1>
      <a href="" className="text-[#025cca] text-sm font-semibold">View all</a>
    </div>
  </div>

  {/* FIXED SCROLL AREA */}
  <div className=" overflow-y-auto h-[500px]  space-y-3">
    {popularDishes.map((dish) => (
      <div
        key={dish.id}
        className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-4"
      >
        <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">
          {dish.id < 10 ? `0${dish.id}` : dish.id}
        </h1>

        <img
          src={dish.image}
          alt={dish.name}
          className="w-[50px] h-[50px] rounded-full"
        />

        <div>
          <h1 className="text-[#f5f5f5] font-semibold tracking-wide">
            {dish.name}
          </h1>
          <p className="text-[#f5f5f5] text-sm">
            <span className="text-[#ababab]">Orders: </span>
            {dish.numberOfOrders}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}
