import HighlightGrid from "@/components/HighlightGrid";
import MainHeader from "@/components/MainHeader";
import Searchbar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import WeeklyGrid from "@/components/WeeklyGrid";
import Image from "next/image";
// import { changeUnit } from "@/redux/slices/unitSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch, useAppSelector } from "@/redux/store";

export default function Home() {
  // const dispatch = useDispatch<AppDispatch>()
  // const unit = useAppSelector((state) => state.unitReducer.value.isFarenheit)
  // dispatch(changeUnit())
  return (
    <main className="flex h-screen w-full bg-gray-100 text-black text-sm">
      <div className=" w-1/3 bg-white gap-6 p-16">
        <Searchbar/>
        <Sidebar/>
      </div>
      <div className=" w-full flex flex-col gap-6 p-16">
        <MainHeader/>
        <WeeklyGrid/>
        <HighlightGrid/>
      </div>
    </main>
  );
}
