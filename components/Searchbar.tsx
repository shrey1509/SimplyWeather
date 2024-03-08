import Image from "next/image";
import { getAddressByName, getWeather } from "./getWeatherData";
import { useDebounce } from "./hooks/useDebounce";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CurrentWeatherState, changeCurrentWeather } from "@/redux/slices/currentWeatherSlice";
import { CurrentHighlightsState, changeCurrentHighlights } from "@/redux/slices/currentHighlightsSlice";
import { WeeklyWeatherState, changeWeeklyWeather } from "@/redux/slices/weeklyWeatherSlice";

function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = useDebounce((term:string) => {      
        const {currentWeather,currentHighlights,days} = getAddressByName(term);
        dispatch(changeCurrentWeather(currentWeather))
        dispatch(changeCurrentHighlights(currentHighlights))
        dispatch(changeWeeklyWeather(days))
    }, 500);

    const handleChange = (value:string) => {
        setSearchTerm(value);
        handleSearch(value);
    };
    return (
        <div className=" flex gap-3 pb-3">
            <Image width={20} height={20} src="/icons/search.svg" alt="search"/>
            <input value={searchTerm} onChange={(e)=>handleChange(e.target.value)} className=" focus:outline-none" placeholder="Search for places..."/>
            <button className=" bg-gray-100 p-2 rounded-full">
                <Image className="ml-auto" width={20} height={20} src="/icons/target.svg" alt="target"/>
            </button>

        </div>
    );
}

export default Searchbar;