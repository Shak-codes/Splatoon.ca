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
    | "9xl"
    | "8xl"
    | "7xl"
    | "6xl"
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
  size = "8xl",
  className,
}: HeaderProps) => {
  const normalized = title.replaceAll("\\N", "\n").replaceAll("\\n", "\n");
  const lines = normalized.split("\n");

  return (
    <header>
      <Typography variant={variant} size={size} className={`${className}`}>
        {lines.map((line, lineIdx) => {
          const chars = Array.from(line);
          return (
            <div key={lineIdx}>
              {chars.map((ch, i) => (
                <span
                  key={`${lineIdx}-${i}`}
                  className={`animate-letter tracking-wider ${
                    lineIdx > 0 ? "text-outline-custom" : "text-white"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          );
        })}
      </Typography>
    </header>
  );
};

export default Header;
