import Typography from "./Typography/Typography";

type SubtitleProps = {
  subtitle: string;
  delay?: number;
  className?: string;
};

const Subtitle = ({ subtitle, delay = 0, className }: SubtitleProps) => {
  const [firstLine, secondLine] = subtitle.split("\\n");

  const renderLine = (text: string, keyPrefix: string) =>
    text.split("").map((c, i) => (
      <span
        key={`${keyPrefix}-${i}`}
        className="animate-subtitle"
        style={{ animationDelay: `${delay + i * 0.08}s` }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <Typography
      variant="subtitle"
      size="lg"
      className={`rounded-sm bg-white p-2 !text-[var(--background)] text-center ${className}`}
    >
      <span key="line1">{renderLine(firstLine, "line1")}</span>
      {secondLine && (
        <span className="block lg:inline" key="line2">
          {renderLine(secondLine, "line2")}
        </span>
      )}
    </Typography>
  );
};

export default Subtitle;
