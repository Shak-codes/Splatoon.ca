import Image from "next/image";
import TopLeftFlair from "@/public/flourish/Flourish16.svg";
import BottomRightFlair from "@/public/flourish/Flourish9.svg";
import Calendar from "@/public/icons/calendar.svg";
import Location from "@/public/icons/location.svg";

const flairOffsetMap: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, string> = {
  0: "ml-[-20px]",
  1: "ml-[-5px]",
  2: "ml-[-5px]",
  3: "ml-[-10px]",
  4: "ml-[-15px]",
  5: "ml-[-11px]",
  6: "ml-[-10px]",
  7: "ml-[-35px]",
  8: "ml-[-6px]",
  9: "ml-[-13px]",
};

const eventNumber = 27;
const lastDigit = Number(String(eventNumber).slice(-1)) as
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;

const flairOffset = flairOffsetMap[lastDigit];

type EventHeaderProps = {
  date: string;
  location: string;
};

const EventHeader = ({ date, location }: EventHeaderProps) => {
  return (
    <section className="flex">
      <section className="flex flex-col w-[570px] gap-5">
        <section className="relative flex items-center gap-2">
          <Image
            src={TopLeftFlair}
            alt="Logo"
            className="absolute -left-32.5 bottom-12 w-40 h-40"
          />
          <div className="flex flex-col items-end">
            <h1 className="text-8xl font-bold">SQUID</h1>
            <h1 className="text-8xl font-bold">SOCIAL</h1>
          </div>
          <div className="relative">
            <h1 className="text-[14rem] m-0 pt-5 inline-block">
              {eventNumber}
            </h1>
            <Image
              src={BottomRightFlair}
              alt="Logo"
              className={`absolute left-full bottom-2 ${flairOffset} w-30 h-30`}
            />
          </div>
        </section>
        <section className="flex gap-10 mt-[-3.5rem]">
          <Image src={Calendar} alt="Calendar Icon" className="w-5 h-5" />
          <h2 className="text-xl italic ml-[-2rem] pt-0.5">{date}</h2>
          <Image src={Location} alt="Location Icon" className="w-5 h-5" />
          <h2 className="text-xl italic ml-[-2rem] pt-0.5">{location}</h2>
        </section>
        <section className="bg-black/50 rounded-sm p-5">
          <p className="font-medium text-lg text-center !leading-6">
            About once every month we host our signature Squid Social event in
            the heart of the Toronto. Whether you're a long time player or new
            to the community, these events are the perfect way to connect with
            fellow fans from around the GTA. Mark your calendars, the next Squid
            Social is officially locked in for Sunday September 7th! Join us for
            an afternoon of fun, laughter and great vibes at Squid Social 27!
          </p>
        </section>
      </section>
    </section>
  );
};

export default EventHeader;
