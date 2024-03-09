"use client"
import Image from "next/image";
import { changeUnit } from "@/redux/slices/unitSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

function MainHeader() {
    const dispatch = useDispatch<AppDispatch>()
    const unit = useAppSelector((state) => state.unitReducer.value.isFarenheit)

    return (
        <div className=" w-full flex gap-3 items-center">
            <div className=" flex gap-3 h-min text-lg items-center font-medium">
                <button className=" text-gray-400 ">
                    Today
                </button>
                <button className="  border-b-2 border-black">
                    Week
                </button>
            </div>
            <div className=" ml-auto flex items-center gap-3">
                <button className={`ps-2 pr-3 py-2 h-min rounded-full ${unit==true?'bg-white text-black':'bg-black text-white'}`} onClick={()=>dispatch(changeUnit(false))}>
                    °C
                </button>
                <button className={`ps-2 pr-3 py-2 h-min rounded-full ${unit==false?'bg-white text-black':'bg-black text-white'}`} onClick={()=>dispatch(changeUnit(true))}>
                    °F
                </button>
                <Image className=" ml-3 rounded-xl object-cover aspect-square" width={50} height={50} src="/profile.jpg" alt="profile"/>
            </div>
        </div>
    );
}

export default MainHeader;