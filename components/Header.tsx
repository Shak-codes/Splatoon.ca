import Typography from "./Typography/Typography";

type HeaderProps = {
  title: string;
  variant:
    | "hero"
    | "header"
    | "title"
    | "subtitle"
    | "sectionTitle"
    | "sectionSubtitle"
    | "subsectionTitle"
    | "subsectionSubtitle"
    | "paragraph";
  size:
    | "page-header"
    | "event-number"
    | "event-text"
    | "5xl"
    | "4xl"
    | "3xl"
    | "2xl"
    | "xl"
    | "lg"
    | "base"
    | "sm";
  className?: string;
};

const Header = ({
  title,
  variant = "header",
  size = "event-text",
  className,
}: HeaderProps) => {
  const normalized = title.replaceAll("\\N", "\n").replaceAll("\\n", "\n");
  const lines = normalized.split("\n");

  return (
    <>
      <Typography variant={variant} size={size} className={`${className}`}>
        {lines.map((line, lineIdx) => {
          const chars = Array.from(line);
          return (
            <span key={lineIdx} className="block">
              {chars.map((ch, i) => (
                <span
                  key={`${lineIdx}-${i}`}
                  className={`animate-letter tracking-wider ${
                    lineIdx > 0 ? "text-[var(--primary)]" : "text-white"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          );
        })}
      </Typography>
    </>
  );
};

// Maybe use "text-[var(--primary)]" for secondary line color

export default Header;
