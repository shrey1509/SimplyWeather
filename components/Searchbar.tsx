import Image from "next/image";

function Searchbar() {
    return (
        <div className=" flex gap-3 pb-3">
            <Image width={20} height={20} src="/icons/search.svg" alt="search"/>
            <input className=" focus:outline-none" placeholder="Search for places..."/>
            <button className=" bg-gray-100 p-2 rounded-full">
                <Image className="ml-auto" width={20} height={20} src="/icons/target.svg" alt="target"/>
            </button>

        </div>
    );
}

export default Searchbar;