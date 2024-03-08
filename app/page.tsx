"use client"
import HighlightGrid from "@/components/HighlightGrid";
import MainHeader from "@/components/MainHeader";
import Searchbar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import WeeklyGrid from "@/components/WeeklyGrid";
import Image from "next/image";
import { useEffect } from "react";
import { getWeather } from "@/components/getWeatherData";
// import { changeUnit } from "@/redux/slices/unitSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CurrentWeatherState, changeCurrentWeather } from "@/redux/slices/currentWeatherSlice";
import { CurrentHighlightsState, changeCurrentHighlights } from "@/redux/slices/currentHighlightsSlice";
import { WeeklyWeatherState, changeWeeklyWeather } from "@/redux/slices/weeklyWeatherSlice";



export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  // const unit = useAppSelector((state) => state.unitReducer.value.isFarenheit)
  // dispatch(changeUnit())


  useEffect(() => {
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const {currentWeather,currentHighlights,days} = getWeather( latitude, longitude );
            dispatch(changeCurrentWeather(currentWeather))
            dispatch(changeCurrentHighlights(currentHighlights))
            dispatch(changeWeeklyWeather(days))
      
        })
    }
}, []);
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
