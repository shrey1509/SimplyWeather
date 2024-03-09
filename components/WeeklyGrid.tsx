
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { getWeatherIconByName, kelvinToCelsius, kelvinToFahrenheit } from "./getWeatherData";
function WeeklyGrid() {
    const weeklyWeather = useAppSelector((state) => state.weeklyWeatherReducer.value)
    const unit = useAppSelector((state) => state.unitReducer.value.isFarenheit)
    return (
        <div className=" grid grid-cols-7 gap-2">
            {Object.values(weeklyWeather).map((day)=><div key={"day"+day.day} className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>{new Date(day.day * 1000).toLocaleString('en-us', {weekday:'long'}).slice(0,3)}</span>
                <Image height={60} width={60} alt="day_weather" src={getWeatherIconByName(day.status)} />
                <div className="flex gap-2">
                    <span>{unit?kelvinToFahrenheit(day.maxTemp):kelvinToCelsius(day.maxTemp)}</span>
                    <span className=" text-gray-300">{unit?kelvinToFahrenheit(day.minTemp):kelvinToCelsius(day.minTemp)}</span>
                </div>
            </div>)}
            
        </div>
    );
}

export default WeeklyGrid;