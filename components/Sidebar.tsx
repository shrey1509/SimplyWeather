import Image from "next/image";

function Sidebar() {
    return (
        <div className=" flex flex-col gap-4">
            <Image src="/weatherIcons/rainy-1.svg" height={80} width={80} alt="current-weather"/>
            <h1>12°<span className="">C</span></h1>
            <span>Monday, 16:00</span>
            <hr/>
            <div className="flex gap-3">
                <Image src="/weatherIcons/cloudy.svg" height={20} width={20} alt="current-weather"/>
                <span>Mostly Cloudy</span>
            </div>
            <div className="flex gap-3">
                <Image src="/weatherIcons/rainy-6.svg" height={20} width={20} alt="current-weather"/>
                <span>Rain - 30%</span>
            </div>
            <div className=" relative">
                <Image fill src="" alt="current_city" />
                <span className=" text-white top-1/2 left-1/3">New York, NY, USA</span>
            </div>
        </div>
    );
}

export default Sidebar;