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
    | "text-9xl"
    | "text-8xl"
    | "text-7xl"
    | "text-6xl"
    | "text-5xl"
    | "text-4xl"
    | "text-3xl"
    | "text-2xl"
    | "text-xl"
    | "text-lg"
    | "text-base"
    | "text-sm";
  className?: string;
};

const Header = ({
  title,
  variant = "header",
  size = "text-8xl",
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
                    lineIdx > 0 ? "text-[var(--primary)]" : "text-white"
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

// Maybe use "text-[var(--primary)]" for secondary line color

export default Header;
