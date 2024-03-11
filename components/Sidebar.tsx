import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { getWeatherIconByName, kelvinToCelsius, kelvinToFahrenheit } from "./getWeatherData";

function Sidebar() {
    const currentWeather = useAppSelector((state) => state.currentWeatherReducer.value)
    const unit = useAppSelector((state) => state.unitReducer.value.isFarenheit)

    return (
        <div className=" flex flex-col gap-4 h-full pb-16 font-medium">
            <Image className=" sidebar-img" src={getWeatherIconByName(currentWeather.status)} height={240} width={240} alt="current-weather"/>
            <div className="flex">
                <h1 className=" font-normal text-6xl">{unit?kelvinToFahrenheit(currentWeather.temperature):kelvinToCelsius(currentWeather.temperature)}</h1>
                <span className=" text-3xl">{unit?"F":"C"}</span>
            </div>
            <span className="text-xl ">{new Date().toLocaleString('en-us', {weekday:'long'})}, <span className=" text-gray-400">{new Date().toLocaleTimeString('en-US',{hour12:true,hour: '2-digit', minute:'2-digit'})}</span></span>
            <hr/>
            <div className="flex gap-3 items-center text-base">
                <Image src={getWeatherIconByName(currentWeather.status)} height={40} width={40} alt="current-weather"/>
                <span>{currentWeather.status}</span>
            </div>
            <div className="flex gap-3 items-center text-base">
                <Image src="/weatherIcons/rainy-6.svg" height={40} width={40} alt="current-weather"/>
                <span>Rain - {currentWeather.humidity}%</span>
            </div>
            <div className=" mt-auto relative w-full h-24">
                <Image className=" object-cover rounded-xl" fill src={currentWeather.image} alt="current_city" />
                <span className=" text-xl text-white absolute top-1/2 left-1/2 center -mt-3">{currentWeather.location}</span>
            </div>
        </div>
    );
}

export default Sidebar;