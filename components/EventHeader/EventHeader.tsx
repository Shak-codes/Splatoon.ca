import Image from "next/image";
import TopLeftFlair from "@/public/flourish/Flourish16.svg";
import BottomRightFlair from "@/public/flourish/Flourish9.svg";
import Button from "../Button";
import Calendar from "@/public/icons/calendar.svg";
import Location from "@/public/icons/location.svg";
import Typography from "../Typography/Typography";
import Header from "../Header";
import styles from "./styles.module.css";

const flairOffsetMap: Record<
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  number | string
> = {
  0: 0,
  1: 9,
  2: 10,
  3: 10,
  4: 5,
  5: 10,
  6: 3,
  7: 6,
  8: 3,
  9: 1,
};

const eventNumber = 29;
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
  href?: string;
  className?: string;
};

const EventHeader = ({ date, location, href, className }: EventHeaderProps) => {
  return (
    <section className={`${styles.headerContainer} ${className}`}>
      <section className="relative w-full flex items-center justify-center">
        <Header
          variant="header"
          size="event-text"
          title="SQUID\NSOCIAL"
          className="text-end"
        />
        <Header
          variant="header"
          size="event-number"
          title={eventNumber.toString()}
          className="mt-[calc(var(--text-sm)/2)] !leading-[0]"
        />
        <Image
          src={TopLeftFlair}
          alt="Social Flair"
          className={styles.tlflair}
          style={{ transform: `translateX(${flairOffset}%)` }}
        />
        <Image
          src={BottomRightFlair}
          alt="Event Number Flair"
          className={styles.brflair}
        />
      </section>

      <section className="w-full flex flex-col md:flex-row md:gap-10 md:justify-center -mt-[3%] md:-mt-[var(--text-sm)]">
        <section className="flex justify-center items-center gap-2">
          <Image src={Calendar} alt="Calendar Icon" width={20} height={20} />
          <Typography size="sm">{date}</Typography>
        </section>
        <section className="flex justify-center items-center gap-2">
          <Image src={Location} alt="Location Icon" width={20} height={20} />
          <Typography size="sm">{location}</Typography>
        </section>
      </section>

      <section className="bg-black/50 rounded-sm p-5">
        <Typography size="sm">
          About once every month we host our signature Squid Social event in the
          heart of the Toronto. Whether you&apos;re a long time player or new to
          the community, these events are the perfect way to connect with fellow
          fans from around the GTA. Mark your calendars, the next Squid Social
          is officially locked in for Sunday November 30th! Join us for an
          afternoon of fun, laughter and great vibes at Squid Social{" "}
          {eventNumber}!
        </Typography>
      </section>
      <Button text="Learn More" href={href} />
    </section>
  );
};

export default EventHeader;
