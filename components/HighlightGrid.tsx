import Image from "next/image";

function HighlightGrid() {
    return (
        <div className=" flex flex-col gap-3">
            <h4>Today's Highlights</h4>
            <div className=" grid grid-cols-3 gap-3">
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">UV Index </span>
                    <div className=" text-xl">5</div>
                </div>
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">Wind Status </span>
                    <div className=" text-xl">7.70 km/h</div>
                    <div className=" flex gap-3">
                        <div className=" rounded-full border px-3 py-2">
                            <Image  height={10} width={10} src="/icons/wind-direction.svg" alt="direction" />
                        </div>
                        <span>WSW</span>
                    </div>  
                </div>
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">Sunrise & Sunset</span>
                    <div className=" flex gap-3">
                        <Image  height={40} width={40} src="/icons/sunrise.svg" alt="sunrise" />
                        <div className="flex flex-col gap-2">
                            <span>6:35 AM</span>
                            <small className=" text-gray-500"> -1m 46s</small>
                        </div>
                    </div> 
                    <div className=" flex gap-3">
                        <Image className=" rotate-180"  height={40} width={40} src="/icons/sunrise.svg" alt="sunset" />
                        <div className="flex flex-col gap-2">
                            <span>6:35 AM</span>
                            <small className=" text-gray-500"> -1m 46s</small>
                        </div>
                    </div> 
                </div>
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">Humidity</span>
                    <div className=" flex items-center justify-between">
                        <div className=" text-xl">12%</div>
                        <div className=" rounded-xl border p-2 h-full">
                            <div className=" bg-indigo-700 rounded-full p-2"/>
                        </div>
                    </div>  
                    <span>Normal</span>
                </div>
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">Visibility</span>
                    <div className=" flex items-center justify-between">
                        <div className=" text-xl">5.2 km</div>
                    </div>  
                    <span>Average</span>
                </div>
                <div className=" bg-white rounded-xl flex flex-col p-4">
                    <span className=" text-gray-500">Air Quality</span>
                    <div className=" flex items-center justify-between">
                        <div className=" text-xl">105</div>
                        <div className=" rounded-xl border p-2 h-full">
                            <div className=" bg-indigo-700 rounded-full p-2"/>
                        </div>
                    </div>  
                    <span>Unhealthy</span>
                </div>
            </div>
        </div>
    );
}

export default HighlightGrid;