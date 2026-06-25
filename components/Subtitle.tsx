import Typography from "./Typography/Typography";
import stagger from "./stagger.module.css";

type SubtitleProps = {
  subtitle: string;
  className?: string;
};

const Subtitle = ({ subtitle, className }: SubtitleProps) => {
  const [firstLine, secondLine] = subtitle.split("\\n");

  const renderLine = (text: string, keyPrefix: string) =>
    text.split("").map((c, i) => (
      <span key={`${keyPrefix}-${i}`} className="animate-subtitle">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <Typography
      variant="subtitle"
      size="lg"
      className={`rounded-sm bg-white p-2 !text-[var(--background)] text-center ${className}`}
    >
      <span key="line1" className={stagger.stagger}>
        {renderLine(firstLine, "line1")}
      </span>
      {secondLine && (
        <span className={`block lg:inline ${stagger.stagger}`} key="line2">
          {renderLine(secondLine, "line2")}
        </span>
      )}
    </Typography>
  );
};

export default Subtitle;
