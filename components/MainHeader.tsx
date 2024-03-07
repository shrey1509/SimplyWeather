import Image from "next/image";

function MainHeader() {
    return (
        <div className=" w-full flex gap-3">
            <div className=" flex gap-3">
                <button className=" p-2">
                    Today
                </button>
                <button className=" p-2 border-b-2">
                    Week
                </button>
            </div>
            <div className=" ml-auto flex gap-3">
                <button className=" px-3 py-2 rounded-full bg-white">
                    °C
                </button>
                <button className=" px-3 py-2 rounded-full bg-white">
                    °F
                </button>
                <Image width={30} height={30} src="" alt="profile"/>
            </div>
        </div>
    );
}

export default MainHeader;