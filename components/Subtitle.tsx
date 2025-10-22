import Typography from "./Typography/Typography";

type SubtitleProps = {
  subtitle: string;
  delay?: number;
  className?: string;
};

const Subtitle = ({ subtitle, delay = 0, className }: SubtitleProps) => {
  return (
    <Typography
      variant="subtitle"
      size="text-lg"
      className={`rounded-sm bg-white p-2 !text-[var(--background)] text-center ${className}`}
    >
      <span key={subtitle}>
        {subtitle.split("").map((c, i) => (
          <span
            key={i}
            className="animate-subtitle"
            style={{
              animationDelay: `${delay + i * 0.08}s`,
            }}
          >
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
    </Typography>
  );
};

export default Subtitle;
