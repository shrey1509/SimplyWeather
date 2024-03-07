import Image from "next/image";
function WeeklyGrid() {
    return (
        <div className=" grid grid-cols-7 gap-2">
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
            <div className=" bg-white rounded-xl flex flex-col items-center p-4">
                <span>Sun</span>
                <Image height={80} width={80} alt="day_weather" src="/weatherIcons/day.svg" />
                <span>15° -3°</span>
            </div>
        </div>
    );
}

export default WeeklyGrid;