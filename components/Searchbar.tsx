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

    const getData = async(latitude:number,longitude:number) => {
        const data = await getWeather( latitude, longitude );
        dispatch(changeCurrentWeather((data as any).currentWeather))
        dispatch(changeCurrentHighlights((data as any).currentHighlights))
        dispatch(changeWeeklyWeather((data as any).days))
      }
    const handleSearch = useDebounce(async(term:string) => {    

        if (term==""){
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                getData(latitude, longitude)
            })
        }else{
            const data = await getAddressByName(term);
            if(data!=undefined){
                dispatch(changeCurrentWeather((data as any).currentWeather))
                dispatch(changeCurrentHighlights((data as any).currentHighlights))
                dispatch(changeWeeklyWeather((data as any).days))
            }
        }
    }, 500);

    const handleChange = (value:string) => {
        setSearchTerm(value);
        handleSearch(value);
    };
    return (
        <div className=" w-full flex gap-3 pb-3">
            <Image width={20} height={20} src="/icons/search.svg" alt="search"/>
            <input value={searchTerm} onChange={(e)=>handleChange(e.target.value)} className=" focus:outline-none" placeholder="Search for places..."/>
            <button className=" bg-gray-100 p-2 rounded-full">
                <Image className="ml-auto" width={20} height={20} src="/icons/target.svg" alt="target"/>
            </button>

        </div>
    );
}

export default Searchbar;