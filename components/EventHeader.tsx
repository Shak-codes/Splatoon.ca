import Image from "next/image";
import TopLeftFlair from "../assets/Flourish16.svg";
import BottomRightFlair from "../assets/Flourish9.svg";

const EventHeader = ({}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center gap-2">
        <Image
          src={TopLeftFlair}
          alt="Logo"
          width={100}
          height={100}
          className="absolute bottom-14 -left-40 w-50 h-50"
        />
        <div className="flex flex-col items-end">
          <h1 className="text-9xl text-black font-bold">SQUID</h1>
          <h1 className="text-9xl text-black font-bold">SOCIAL</h1>
        </div>
        <Image
          src={BottomRightFlair}
          alt="Logo"
          width={100}
          height={100}
          className="absolute bottom-5 -right-19 w-30 h-30"
        />
        <h1 className="text-[18rem] text-black m-0 pt-5">27</h1>
      </div>
      <div className="rounded-lg bg-white w-full h-15 mt-[-40px] flex items-center justify-center">
        <h2 className="text-3xl text-center">
          Sunday September 7th - Invictus Gaming
        </h2>
      </div>
    </div>
  );
};

export default EventHeader;
