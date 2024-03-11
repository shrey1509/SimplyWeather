"use client"
import HighlightGrid from "@/components/HighlightGrid";
import MainHeader from "@/components/MainHeader";
import Searchbar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import WeeklyGrid from "@/components/WeeklyGrid";
import Image from "next/image";
import { useEffect } from "react";
import {  getWeather } from "@/components/getWeatherData";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CurrentWeatherState, changeCurrentWeather } from "@/redux/slices/currentWeatherSlice";
import { CurrentHighlightsState, changeCurrentHighlights } from "@/redux/slices/currentHighlightsSlice";
import { WeeklyWeatherState, changeWeeklyWeather } from "@/redux/slices/weeklyWeatherSlice";



export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  const getData = async(latitude:number,longitude:number) => {
    const data = await getWeather( latitude, longitude );
    dispatch(changeCurrentWeather((data as any).currentWeather))
    dispatch(changeCurrentHighlights((data as any).currentHighlights))
    dispatch(changeWeeklyWeather((data as any).days))
  }

  useEffect(() => {
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            getData(latitude,longitude)
      
        })
    }
  }, [getData]);
  return (
    <main className="flex h-screen w-full bg-gray-100 text-black text-sm">
      <div className=" w-1/3 bg-white gap-6 py-8 2xl:py-16 px-8">
        <Searchbar/>
        <Sidebar/>
      </div>
      <div className=" w-full flex flex-col gap-8 2xl:gap-12 p-8 2xl:p-16">
        <MainHeader/>
        <WeeklyGrid/>
        <HighlightGrid/>
      </div>
    </main>
  );
}
