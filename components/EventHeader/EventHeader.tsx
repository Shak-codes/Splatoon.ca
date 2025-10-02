import Image from "next/image";
import TopLeftFlair from "@/public/flourish/Flourish16.svg";
import BottomRightFlair from "@/public/flourish/Flourish9.svg";
import Button from "../Button";
import Calendar from "@/public/icons/calendar.svg";
import Location from "@/public/icons/location.svg";
import Typography from "../Typography/Typography";
import PageHeader from "../PageHeader";
import styles from "./styles.module.css";

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
    <section
      className={`${styles.containerVars} flex flex-col items-start gap-5 w-[var(--container-width)]`}
    >
      <section className="relative flex items-center">
        <PageHeader
          variant="LARGE"
          title="SQUID\NSOCIAL"
          className="text-end"
        />
        <PageHeader
          variant="XL"
          title={eventNumber.toString()}
          className="mt-[calc(var(--text-sm)/2)] !leading-[0]"
        />
        <Image
          src={TopLeftFlair}
          alt="Social Flair"
          className={`${styles.tlflairVars} absolute left-[var(--tlflair-left)] bottom-[var(--tlflair-bottom)] w-[var(--tlflair-width)] h-auto`}
        />

        <Image
          src={BottomRightFlair}
          alt="Event Number Flair"
          className={`${styles.brflairVars} absolute right-[var(--brflair-right)] bottom-[var(--brflair-bottom)] w-[var(--brflair-width)] h-auto`}
        />
      </section>

      <section className="flex gap-10 -mt-[var(--text-base)] border-2">
        <section className="flex justify-center items-center gap-2">
          <Image src={Calendar} alt="Calendar Icon" width={20} height={20} />
          <Typography variant="small">{date}</Typography>
        </section>
        <section className="flex justify-center items-center gap-2">
          <Image src={Location} alt="Location Icon" width={20} height={20} />
          <Typography variant="small">{location}</Typography>
        </section>
      </section>

      <section className="bg-black/50 rounded-sm p-5">
        <Typography variant="small">
          About once every month we host our signature Squid Social event in the
          heart of the Toronto. Whether you're a long time player or new to the
          community, these events are the perfect way to connect with fellow
          fans from around the GTA. Mark your calendars, the next Squid Social
          is officially locked in for Sunday September 7th! Join us for an
          afternoon of fun, laughter and great vibes at Squid Social 27!
        </Typography>
      </section>
      <Button
        text="Learn More"
        onClick={() => console.log("Click!")}
        disabled={false}
      />
    </section>
  );
};

export default EventHeader;
