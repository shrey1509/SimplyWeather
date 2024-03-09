import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { getWeatherIconByName, kelvinToCelsius, kelvinToFahrenheit } from "./getWeatherData";

function HighlightGrid() {
    const currentHighlights = useAppSelector((state) => state.currentHighlightsReducer.value)
    const degToCompass = (num:number) => {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    return (
        <div className=" flex flex-col gap-3 h-full">
            <h4>{`Today's`} Highlights</h4>
            <div className=" grid grid-cols-3 gap-3 h-full">
                <div className=" h-full w-full bg-white rounded-xl flex flex-col justify-between items-center p-4 relative">
                    <span className=" w-full text-left text-gray-500 ">UV Index </span>
                    <div className=" text-5xl absolute bottom-3 left-1/3 ml-4">{currentHighlights.uvIndex.toFixed(0).padStart(2,'0')}</div>
                    <div role="progressbar"  style={{'--value': (currentHighlights.uvIndex/15)*100} as React.CSSProperties}></div>
                </div>
                <div className=" h-full w-full bg-white rounded-xl flex flex-col justify-between p-4">
                    <span className=" text-gray-500">Wind Status </span>
                    <div className=" text-5xl">{(currentHighlights.windSpeed*3.6).toFixed(0)} <span className=" text-xl">km/h</span></div>
                    <div className=" flex gap-3 items-center">
                        <div className=" rounded-full border p-2">
                            <Image style={{'--value': 180+currentHighlights.windDirection+'deg'} as React.CSSProperties} className={` direction`}  height={10} width={10} src="/icons/wind-direction.svg" alt="direction" />
                        </div>
                        <span>{degToCompass(parseInt(currentHighlights.windDirection))}</span>
                    </div>  
                </div>
                <div className=" h-full w-full bg-white rounded-xl flex flex-col justify-between p-4">
                    <span className=" text-gray-500">Sunrise & Sunset</span>
                    <div className=" flex  items-center gap-3">
                        <Image  height={30} width={30} src="/icons/sunrise.svg" alt="sunrise" />
                        <div className="flex flex-col gap-2">
                            <span className=" text-base font-medium">{new Date(currentHighlights.sunrise*1000).toLocaleTimeString('en-US',{hour12:true,hour: '2-digit', minute:'2-digit'})}</span>
                            {/* <small className=" text-gray-500"> -1m 46s</small> */}
                        </div>
                    </div> 
                    <div className=" flex items-center gap-3">
                        <Image className=" rotate-180"  height={30} width={30} src="/icons/sunrise.svg" alt="sunset" />
                        <div className="flex  flex-col gap-2">
                            <span className=" text-base font-medium">{new Date(currentHighlights.sunset*1000).toLocaleTimeString('en-US',{hour12:true,hour: '2-digit', minute:'2-digit'})}</span>
                            {/* <small className=" text-gray-500"> -1m 46s</small> */}
                        </div>
                    </div> 
                </div>
                <div className=" h-full w-full bg-white rounded-xl flex p-4 justify-between items-center">
                    <div className="flex flex-col justify-between h-full">
                        <span className=" text-gray-500">Humidity</span>
                        <div className=" text-5xl">{currentHighlights.humidity}<span className=" text-xl">%</span></div>
                        <span className=" font-medium">{currentHighlights.humidity>80? "Very Humid 👍": currentHighlights.humidity>60? "Fairly Humid 👌": currentHighlights.humidity>40? "Moderately Humid 👌": currentHighlights.humidity>20? "Dry 👎":"Very Dry 💀"}</span>
                    </div>
                    <div className="relative rounded-2xl border px-4 py-2 h-20">
                        <div style={{'--value': currentHighlights.humidity+"%"} as React.CSSProperties} className={` meter bg-indigo-700 rounded-full p-2 left-2  absolute `}/>
                    </div>
                </div>
                <div className=" h-full w-full bg-white rounded-xl flex flex-col p-4 justify-between">
                    <span className=" text-gray-500">Visibility</span>
                    <div className=" flex items-center justify-between">
                        <div className=" text-5xl">{currentHighlights.visibility/1000} <span className=" text-xl">km</span></div>
                    </div>  
                    <span className=" font-medium">{currentHighlights.visibility>8? "Good 👍": currentHighlights.visibility>6? "Fair 👌": currentHighlights.visibility>4? "Moderate 👌": currentHighlights.visibility>2? "Poor 👎":"Very Poor 💀"}</span>
                </div>
                <div className=" h-full w-full bg-white rounded-xl flex p-4 justify-between items-center">
                    <div className="flex flex-col justify-between h-full">
                        <span className=" text-gray-500">Air Quality</span>
                        <div className=" text-5xl">{currentHighlights.airQuality}</div>
                        <span className=" font-medium">{currentHighlights.airQuality==1? "Good 👍": currentHighlights.airQuality==2? "Fair 👌": currentHighlights.airQuality==3? "Moderate 👌": currentHighlights.airQuality==4? "Poor 👎": currentHighlights.airQuality==5? "Very Poor 💀":""}</span>
                    </div>
                    <div className="relative rounded-2xl border px-4 py-2 h-20">
                        <div style={{'--value': (currentHighlights.airQuality/5)*100+"%"} as React.CSSProperties}  className={` meter bg-indigo-700 rounded-full p-2 left-2  absolute `}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HighlightGrid;