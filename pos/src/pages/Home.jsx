import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/shared/Greetings";
import MiniCard from "../components/shared/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrder from "../components/shared/RecentOrder";
import PopularDish from "../components/shared/PopularDish";


export default function Home() {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* left div */}
      <div className="flex-3">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
            <MiniCard title="Total Earning" icon={<BsCashCoin/>} number={512} footerNum={1.6}/>
            <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6}/>
        </div>
        <div>
            <RecentOrder/>
        </div>
      </div>
      {/* Right div */}
      <div className="flex-2">
        <PopularDish/>
      </div>
      <BottomNav />
    </section>
  );
}
